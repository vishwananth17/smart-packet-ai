import { NextRequest, NextResponse } from 'next/server';
import { PartyPlanRequest, PartyPlanResult } from '@/lib/types';
import { callGemini } from '@/lib/gemini';
import { getMockPartyPlan } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    const body: PartyPlanRequest = await req.json();

    if (!body.budget || body.budget <= 0) {
      return NextResponse.json({ error: 'Valid budget is required' }, { status: 400 });
    }

    if (!body.guestCount || body.guestCount <= 0) {
      return NextResponse.json({ error: 'Guest count must be at least 1' }, { status: 400 });
    }

    const systemInstruction = `You are PocketSmart AI's Party & Event Budget Planner.
Your job is to proportionally distribute a party budget across Catering (40-50%), Venue/Stays (20-25%), Decoration (15-20%), and Entertainment (10-15%).
Source actionable vendors and options across Swiggy, Zomato, OYO, Amazon, Blinkit, and local services.
Return ONLY valid JSON matching PartyPlanResult schema. Do NOT wrap in markdown backticks or any other text.`;

    const prompt = `Plan this event:
- Total Budget: ${body.currency} ${body.budget}
- Guest Count: ${body.guestCount}
- Event Type: ${body.eventType}
- Venue Type: ${body.venueType}
- Food/Catering Style: ${body.foodPreference}
- Special Notes: ${body.specialRequests || 'None'}

Return pure JSON matching this exact structure:
{
  "totalBudget": number,
  "totalEstimatedCost": number,
  "currency": "${body.currency}",
  "guestCount": number,
  "eventType": "${body.eventType}",
  "costPerGuest": number,
  "allocations": [
    {
      "category": "Catering & Food" | "Venue & Stays" | "Decoration & Lighting" | "Entertainment & Sound" | "Miscellaneous",
      "allocatedAmount": number,
      "percentage": number,
      "vendorSuggestions": [
        {
          "id": string,
          "name": string,
          "category": string,
          "platform": "Swiggy" | "Zomato" | "OYO" | "Amazon" | "Flipkart" | "Other",
          "price": number,
          "currency": "${body.currency}",
          "description": string,
          "matchReason": string,
          "url": string,
          "rating": number,
          "tag": string
        }
      ]
    }
  ],
  "timelineChecklist": [
    {
      "phase": string,
      "action": string,
      "deadline": string
    }
  ],
  "tips": [string, string, string]
}`;

    try {
      const geminiResponse = await callGemini(systemInstruction, prompt);
      const cleaned = geminiResponse.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
      const parsed: PartyPlanResult = JSON.parse(cleaned);
      return NextResponse.json({ ...parsed, isAiGenerated: true });
    } catch (aiError) {
      console.warn('Gemini call failed or not configured, using smart mock data generator:', aiError);
      const fallback = getMockPartyPlan(body);
      return NextResponse.json({ ...fallback, isAiGenerated: false });
    }
  } catch (error: any) {
    console.error('Party plan error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
