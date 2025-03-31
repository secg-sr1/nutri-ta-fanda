// api/analyze.js

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { base64Image } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: 'Image is required' });
  }

  try {
    // OpenAI Vision Prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-2024-04-09',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: `
              You are an expert in nutrition. Extract the nutritional information from the following meal image.
              Return only this JSON format:
              [
                {
                  "food_item": string,
                  "estimated_quantity": string (optional),
                  "sugar": grams (number),
                  "protein": grams (number),
                  "fat": grams (number),
                  "carbohydrates": grams (number)
                }
              ]
            `},
            { type: 'image_url', image_url: { url: base64Image } }
          ]
        }
      ],
    });

    // Parse JSON safely
    const jsonMatch = response.choices[0]?.message?.content?.match(/\[.*\]/s);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'AI failed to produce valid JSON' });
    }

    const nutritionData = JSON.parse(jsonMatch[0]);
    return res.status(200).json({ data: nutritionData });

  } catch (error) {
    console.error('OpenAI Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
