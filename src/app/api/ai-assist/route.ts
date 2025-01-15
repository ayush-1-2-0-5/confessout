import { Configuration, OpenAIApi } from 'openai-edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, tone, prompt } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  try {
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
    const stream = new TransformStream({
      async transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }
            try {
              const json = JSON.parse(data);
              const token = json.choices[0]?.delta?.content || '';
              if (token) {
                controller.enqueue(token);
              }
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          }
        }
      },
    });

    return new Response(response.body?.pipeThrough(stream), {
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
