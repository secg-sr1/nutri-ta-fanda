// api/analyze/route.js

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const config = { runtime: 'edge' }; // optional if you want edge functions

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    const { base64Image } = await req.json();

    if (!base64Image) {
        return new Response(JSON.stringify({ error: 'Image is required' }), { status: 400 });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo-2024-04-09",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "You are an expert nutritionist..." },
                        { type: "image_url", image_url: { url: base64Image, detail: "low" } }
                    ]
                }
            ]
        });

        const nutritionData = JSON.parse(response.choices[0].message.content.replace(/```json|```/g, '').trim());
        return new Response(JSON.stringify({ data: nutritionData }), { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Failed to analyze image" }), { status: 500 });
    }
}
