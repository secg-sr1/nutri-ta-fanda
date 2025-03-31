// /api/analyze.js (Vercel API Route)

import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { base64Image } = req.body;

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
            { type: 'text', text: `You are an expert nutrition assistant called "Tough Angie". For the following image, list each detected food as a JSON object with:
            - food_item (string)
            - estimated_quantity (string, optional, e.g., '1 cup', '200g')
            - sugar (grams)
            - protein (grams)
            - fat (grams)
            - carbohydrates (grams)

            Your response MUST be a JSON array without markdown, explanations, or code blocks.` },
            { type: 'image_url', image_url: { url: base64Image, detail: 'low' } }
          ]
        }
      ]
    });

    let rawContent = response.choices[0].message.content;

    // Clean markdown formatting just in case
    rawContent = rawContent.replace(/```json|```/g, '').trim();

    let nutritionData;
    try {
      nutritionData = JSON.parse(rawContent);
    } catch (e) {
      return res.status(500).json({ error: 'AI returned invalid JSON.' });
    }

    res.status(200).json({ data: nutritionData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
}
