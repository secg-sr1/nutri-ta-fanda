import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { base64Image } = await req.json();

  if (!base64Image) {
    return res.status(400).json({ error: 'Image is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-2024-04-09',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: `You are an expert nutrition assistant called Tough Angie...` },
            { type: 'image_url', image_url: { url: base64Image, detail: 'low' } }
          ]
        }
      ]
    });

    const raw = response.choices[0].message.content.replace(/```json|```/g, '').trim();
    const nutritionData = JSON.parse(raw);

    return res.status(200).json({ data: nutritionData });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to analyze image' });
  }
}
