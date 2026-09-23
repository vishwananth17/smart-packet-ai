import { NextRequest, NextResponse } from 'next/server';
import { HomePlanRequest, HomePlanResult } from '@/lib/types';
import { callGemini } from '@/lib/gemini';
import { getMockHomePlan } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    const body: HomePlanRequest = await req.json();

    if (!body.budget || body.budget <= 0) {
      return NextResponse.json({ error: 'Valid budget is required' }, { status: 400 });
    }

    if (!body.rooms || body.rooms.length === 0) {
      return NextResponse.json({ error: 'At least one room must be specified' }, { status: 400 });
    }

    const systemInstruction = `You are PocketSmart AI's expert Home Interior Budget Planning engine.
Your task is to analyze user room types, requested items, aesthetic style, and strict budget limit, and produce balanced, platform-aware product recommendations from real e-commerce stores (IKEA, Amazon, Pepperfry, Urban Ladder, Flipkart).
You must return ONLY a valid JSON object matching the HomePlanResult schema. Do NOT wrap in markdown backticks or any other text.`;

    const prompt = `Generate a complete home interior budget recommendation with this specification:
- Total Budget: ${body.currency} ${body.budget}
- Target Rooms: ${body.rooms.join(', ')}
- Preferred Aesthetic Style: ${body.style}
- Specific Requested Items & Quantities: ${JSON.stringify(body.items || {})}
- Additional Notes: ${body.notes || 'None'}

Rules:
1. Ensure the sum of item prices across all rooms does NOT exceed the total budget of ${body.currency} ${body.budget}.
2. For each room, provide 2 to 4 high-value essential items sourced from IKEA, Amazon, Pepperfry, Urban Ladder, or Flipkart with realistic prices and direct search URLs.
3. Include specific interior design tips per room matching the ${body.style} aesthetic.
4. Return pure JSON with keys:
{
  "totalBudget": number,
  "totalEstimatedCost": number,
  "currency": "${body.currency}",
  "budgetAdherencePercentage": number (0-100),
  "summary": string,
  "roomBreakdowns": [
    {
      "room": string,
      "allocatedBudget": number,
      "estimatedCost": number,
      "items": [
        {
          "id": string,
          "name": string,
          "category": string,
          "platform": "IKEA" | "Amazon" | "Pepperfry" | "Urban Ladder" | "Flipkart",
          "price": number,
          "currency": "${body.currency}",
          "description": string,
          "matchReason": string,
          "url": string,
          "rating": number,
          "tag": string
        }
      ],
      "designTips": [string, string, string]
    }
  ],
  "generalTips": [string, string, string],
  "costSavingAdvice": string,
  "suggestedPlatforms": ["IKEA", "Amazon", "Pepperfry", "Urban Ladder", "Flipkart"]
}`;

    try {
      const geminiResponse = await callGemini(systemInstruction, prompt);
      const cleaned = geminiResponse.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
      const parsed: HomePlanResult = JSON.parse(cleaned);
      return NextResponse.json({ ...parsed, isAiGenerated: true });
    } catch (aiError) {
      console.warn('Gemini call failed or not configured, using smart mock data generator:', aiError);
      const fallback = getMockHomePlan(body);
      return NextResponse.json({ ...fallback, isAiGenerated: false });
    }
  } catch (error: any) {
    console.error('Home plan error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
