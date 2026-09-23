import { NextRequest, NextResponse } from 'next/server';
import { JewelryPlanRequest, JewelryPlanResult } from '@/lib/types';
import { callGemini } from '@/lib/gemini';
import { getMockJewelryPlan } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    const body: JewelryPlanRequest = await req.json();

    if (!body.budget || body.budget <= 0) {
      return NextResponse.json({ error: 'Valid budget is required' }, { status: 400 });
    }

    const systemInstruction = `You are PocketSmart AI's Jewelry & Occasion Stylist powered by multimodal GenAI.
You analyze user budgets, occasion, style preferences, and any uploaded outfit photograph.
You detect the outfit's primary colors, neckline, undertones, and embroidery, and curate matching jewelry pieces (Necklace, Earrings, Bangles/Bracelets, Ring) from platforms like Amazon, Flipkart, Tanishq, CaratLane, and Bluestone that strictly fit within the user's budget.
Return ONLY valid JSON matching JewelryPlanResult schema. Do NOT wrap in markdown backticks.`;

    const prompt = `Perform multimodal jewelry matching:
- Total Budget: ${body.currency} ${body.budget}
- Occasion: ${body.occasion}
- Style Preference: ${body.style}
- Metal Preference: ${body.metalPreference || 'Auto-select best match'}
- User Outfit Description: ${body.outfitDescription || (body.outfitImageBase64 ? 'Analyze uploaded outfit image' : 'Festive occasion wear')}
${body.outfitImageBase64 ? 'ANALYZE THE ATTACHED OUTFIT IMAGE: Detect fabric color, zari/work, neckline, and recommend harmonizing jewelry.' : 'No outfit image provided; optimize for described occasion and style.'}

Return pure JSON matching this exact structure:
{
  "totalBudget": number,
  "totalEstimatedCost": number,
  "currency": "${body.currency}",
  "occasion": "${body.occasion}",
  "aestheticAnalysis": {
    "outfitColorsDetected": [string, string],
    "necklineDetected": string,
    "recommendedMetal": string,
    "overallVibe": string
  },
  "recommendations": [
    {
      "pieceType": "Necklace / Choker" | "Earrings / Jhumkas" | "Bangles / Bracelets" | "Rings" | "Hair / Accent Piece",
      "item": {
        "id": string,
        "name": string,
        "category": string,
        "platform": "Tanishq" | "CaratLane" | "Amazon" | "Flipkart" | "Other",
        "price": number,
        "currency": "${body.currency}",
        "description": string,
        "matchReason": string,
        "url": string,
        "rating": number,
        "tag": string
      }
    }
  ],
  "stylingTips": [string, string, string]
}`;

    const imagePayload = body.outfitImageBase64
      ? {
          mimeType: body.outfitImageMimeType || 'image/jpeg',
          base64: body.outfitImageBase64,
        }
      : undefined;

    try {
      const geminiResponse = await callGemini(systemInstruction, prompt, imagePayload);
      const cleaned = geminiResponse.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
      const parsed: JewelryPlanResult = JSON.parse(cleaned);
      return NextResponse.json({ ...parsed, isAiGenerated: true });
    } catch (aiError) {
      console.warn('Gemini call failed or not configured, using smart mock data generator:', aiError);
      const fallback = getMockJewelryPlan(body);
      return NextResponse.json({ ...fallback, isAiGenerated: false });
    }
  } catch (error: any) {
    console.error('Jewelry plan error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
