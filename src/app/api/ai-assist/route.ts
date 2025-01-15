import { Configuration, OpenAIApi } from 'openai-edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, tone, prompt } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content;
    if (!lastMessage) {
      return new Response('Invalid input: lastMessage is missing', { status: 400 });
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: `You are a helpful writing assistant. Based on the prompt "${prompt}", improve the following text to make it more ${tone}, while maintaining its core message and personal voice. Do not explain what you changed - just provide the improved version.`,
        },
        { role: 'user', content: lastMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const stream = new ReadableStream({
      start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = ''; // Buffer to hold incomplete JSON data

        const processStream = async () => {
          while (reader) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true }); // Append new data to buffer
            const lines = buffer.split('\n'); // Split data into lines

            buffer = lines.pop()!; // Save the last incomplete line back to the buffer

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6); // Remove "data: "
                if (data === '[DONE]') {
                  controller.close();
                  return;
                }
                try {
                  const json = JSON.parse(data); // Parse the complete JSON line
                  const token = json.choices[0]?.delta?.content || '';
                  if (token) {
                    controller.enqueue(token);
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', error);
                  // Ignore the malformed line and continue processing
                }
              }
            }
          }

          controller.close();
        };

        processStream();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error in OpenAI request:', error);
    return new Response('Error processing the request', { status: 500 });
  }
}
