// /api/analyze/route.js (Modern Vercel API Route)

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const config = {
    runtime: 'edge', // Optional: enable Vercel Edge Runtime
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: { 'content-type': 'application/json' },
        });
    }

    let base64Image;
    try {
        const body = await req.json();
        base64Image = body.base64Image;
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON Body' }), {
            status: 400,
            headers: { 'content-type': 'application/json' },
        });
    }

    if (!base64Image) {
        return new Response(JSON.stringify({ error: 'Image is required' }), {
            status: 400,
            headers: { 'content-type': 'application/json' },
        });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo-2024-04-09",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "You are an expert nutritionist called Tough Angie. For the following image, list detected food as a JSON array with:\n - food_item\n - estimated_quantity\n - sugar\n - protein\n - fat\n - carbohydrates\n No explanation, no markdown, pure JSON." },
                        { type: "image_url", image_url: { url: base64Image, detail: "low" } }
                    ]
                }
            ]
        });

        const content = response.choices[0].message.content.replace(/```json|```/g, '').trim();
        const nutritionData = JSON.parse(content);

        return new Response(JSON.stringify({ data: nutritionData }), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Failed to analyze image" }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}
