import { Configuration, OpenAIApi } from 'openai-edge';
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, tone, prompt } = await req.json();
    const formattedMessages = messages
      .map((message: { role: string; content: string }) => `${message.role}: ${message.content}`)
      .join('\n');

    const fullPrompt = `You are a helpful writing assistant. Based on the prompt "${prompt}", improve the following text to make it more ${tone}, while maintaining its core message and personal voice. Do not explain what you changed - just provide the improved version.\n\n${formattedMessages}\nAI:`;
    const openAiResponse = await openai.createCompletion({
      model: 'gpt-3.5-turbo-instruct',
      prompt: fullPrompt,
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1.0,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [' User:', ' AI:'],
    });

    const result = await openAiResponse.json();
    // console.log('OpenAI API Response:', result);

    if (!result.choices || !Array.isArray(result.choices) || result.choices.length === 0) {
      throw new Error('Invalid response from OpenAI: No choices found');
    }

    const improvedText = result.choices[0]?.text?.trim();

    if (!improvedText) {
      throw new Error('No response text from OpenAI');
    }
    return new Response(improvedText, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error in OpenAI request:', error);
    return new Response('Error processing the request', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}