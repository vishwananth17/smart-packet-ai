import os
import json
import base64
import requests
from typing import Optional, Dict, Any
from schemas import (
    HomePlanRequest, HomePlanResponse,
    PartyPlanRequest, PartyPlanResponse,
    JewelryPlanRequest, JewelryPlanResponse
)

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

def call_gemini_api(system_prompt: str, user_prompt: str, image_base64: Optional[str] = None, mime_type: str = "image/jpeg") -> Dict[str, Any]:
    """
    Direct REST API invocation for Google Gemini 1.5 Flash Pro
    Supports text and multimodal image analysis.
    """
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_api_key_here":
        raise ValueError("GEMINI_API_KEY is not set or invalid.")

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

    parts = []
    if image_base64:
        clean_base64 = image_base64.split(",")[-1]
        parts.append({
            "inline_data": {
                "mime_type": mime_type,
                "data": clean_base64
            }
        })

    parts.append({"text": f"{system_prompt}\n\n{user_prompt}"})

    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "temperature": 0.4,
            "maxOutputTokens": 2500,
            "responseMimeType": "application/json"
        }
    }

    res = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=30)
    if res.status_code != 200:
        raise RuntimeError(f"Gemini API returned {res.status_code}: {res.text}")

    result = res.json()
    text = result["candidates"][0]["content"]["parts"][0]["text"]
    cleaned = text.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(cleaned)


# ---------------- SCENARIO 1: HOME PLANNER UTILS ----------------

def generate_home_plan(req: HomePlanRequest) -> Dict[str, Any]:
    system_instruction = (
        "You are PocketSmart AI's Home Interior Budget Planning engine. "
        "Analyze rooms, budget limits, requested items, and style, then produce balanced product recommendations "
        "from real platforms like IKEA, Amazon, Pepperfry, Urban Ladder, and Flipkart. "
        "Return pure JSON conforming to the HomePlanResponse structure."
    )
    user_prompt = (
        f"Total Budget: {req.currency} {req.budget}\n"
        f"Target Rooms: {', '.join(req.rooms)}\n"
        f"Style: {req.style}\n"
        f"Items: {json.dumps(req.items or {})}\n"
        f"Notes: {req.notes or 'None'}"
    )

    try:
        return call_gemini_api(system_instruction, user_prompt)
    except Exception as e:
        print(f"[GeminiUtils] Fallback home generator triggered: {e}")
        return get_fallback_home_plan(req)

def get_fallback_home_plan(req: HomePlanRequest) -> Dict[str, Any]:
    budget = req.budget
    per_room = budget / max(1, len(req.rooms))
    breakdowns = []

    for room in req.rooms:
        items = [
            {
                "id": f"item-{room}-1",
                "name": f"{req.style} Comfort Seating / Unit",
                "category": "Furniture",
                "platform": "IKEA",
                "price": round(per_room * 0.45),
                "currency": req.currency,
                "description": f"Ergonomic modular seating piece tailored for {req.style} spaces.",
                "matchReason": "Balanced durability and contemporary aesthetic.",
                "url": "https://www.ikea.com",
                "rating": 4.6,
                "tag": "Best Value"
            },
            {
                "id": f"item-{room}-2",
                "name": "Smart Ambient Ceiling & Floor Light Set",
                "category": "Lighting",
                "platform": "Amazon",
                "price": round(per_room * 0.25),
                "currency": req.currency,
                "description": "Multi-tone warm LED smart fixture with app dimming control.",
                "matchReason": "Cost-effective ambient layering.",
                "url": "https://www.amazon.in",
                "rating": 4.7
            },
            {
                "id": f"item-{room}-3",
                "name": "Textured Area Rug & Accent Drapes",
                "category": "Soft Furnishings",
                "platform": "Pepperfry",
                "price": round(per_room * 0.18),
                "currency": req.currency,
                "description": "Anti-skid neutral weave rug and thermal blackout curtains.",
                "matchReason": "Completes acoustic and visual warmth under budget cap.",
                "url": "https://www.pepperfry.com",
                "rating": 4.4
            }
        ]
        cost = sum(i["price"] for i in items)
        breakdowns.append({
            "room": room,
            "allocatedBudget": per_room,
            "estimatedCost": cost,
            "items": items,
            "designTips": [
                f"Position central furniture perpendicular to natural light in your {room}.",
                "Keep base palettes neutral with 1 signature accent wall or art frame.",
                "Use vertical wall mounts to preserve open walkway clearance."
            ]
        })

    total_est = sum(b["estimatedCost"] for b in breakdowns)
    return {
        "totalBudget": budget,
        "totalEstimatedCost": total_est,
        "currency": req.currency,
        "budgetAdherencePercentage": min(100, int((total_est / budget) * 100)),
        "summary": f"Tailored {req.style} blueprint across {', '.join(req.rooms)} staying within your target budget.",
        "roomBreakdowns": breakdowns,
        "generalTips": [
            "Leverage seasonal platform discounts on Amazon and IKEA for additional 10-15% savings.",
            "Verify doorway clearance dimensions before confirming large furniture delivery."
        ],
        "costSavingAdvice": f"Reserve remaining buffer of {req.currency} {max(0, budget - total_est):,.0f} for logistics and mounting fixtures.",
        "suggestedPlatforms": ["IKEA", "Amazon", "Pepperfry", "Urban Ladder", "Flipkart"]
    }


# ---------------- SCENARIO 2: PARTY PLANNER UTILS ----------------

def generate_party_plan(req: PartyPlanRequest) -> Dict[str, Any]:
    system_instruction = (
        "You are PocketSmart AI's Party & Event Planner. "
        "Proportionally allocate budget across Catering (45%), Venue/Stays (22%), Decoration (18%), and Entertainment (15%). "
        "Source options from Swiggy, Zomato, OYO, and Amazon. "
        "Return pure JSON conforming to PartyPlanResponse structure."
    )
    user_prompt = (
        f"Total Budget: {req.currency} {req.budget}\n"
        f"Guests: {req.guestCount}\n"
        f"Event Type: {req.eventType}\n"
        f"Venue: {req.venueType}\n"
        f"Food Style: {req.foodPreference}\n"
        f"Notes: {req.specialRequests or 'None'}"
    )

    try:
        return call_gemini_api(system_instruction, user_prompt)
    except Exception as e:
        print(f"[GeminiUtils] Fallback party generator triggered: {e}")
        return get_fallback_party_plan(req)

def get_fallback_party_plan(req: PartyPlanRequest) -> Dict[str, Any]:
    b = req.budget
    cat_amt = round(b * 0.45)
    ven_amt = round(b * 0.22)
    dec_amt = round(b * 0.18)
    ent_amt = round(b * 0.15)
    total_est = cat_amt + ven_amt + dec_amt + ent_amt

    return {
        "totalBudget": b,
        "totalEstimatedCost": total_est,
        "currency": req.currency,
        "guestCount": req.guestCount,
        "eventType": req.eventType,
        "costPerGuest": round(total_est / max(1, req.guestCount)),
        "allocations": [
            {
                "category": "Catering & Food",
                "allocatedAmount": cat_amt,
                "percentage": 45,
                "vendorSuggestions": [
                    {
                        "id": "cat-1",
                        "name": f"{req.foodPreference} Catering Platter for {req.guestCount}",
                        "category": "Catering",
                        "platform": "Zomato",
                        "price": round(cat_amt * 0.75),
                        "currency": req.currency,
                        "description": "Multi-course meal with appetizers, breads, entrees, and dessert.",
                        "matchReason": "Top rated party bulk catering package.",
                        "url": "https://www.zomato.com",
                        "rating": 4.8,
                        "tag": "Top Caterer"
                    },
                    {
                        "id": "cat-2",
                        "name": "Artisan Beverages & Mocktail Kegs",
                        "category": "Beverages",
                        "platform": "Swiggy",
                        "price": round(cat_amt * 0.25),
                        "currency": req.currency,
                        "description": "Chilled beverage cans, mocktail syrups, and ice buckets.",
                        "matchReason": "Prompt delivery on Swiggy Instamart.",
                        "url": "https://www.swiggy.com",
                        "rating": 4.7
                    }
                ]
            },
            {
                "category": "Venue & Stays",
                "allocatedAmount": ven_amt,
                "percentage": 22,
                "vendorSuggestions": [
                    {
                        "id": "ven-1",
                        "name": f"{req.venueType} Event Booking / Villa Access",
                        "category": "Venue",
                        "platform": "OYO",
                        "price": ven_amt,
                        "currency": req.currency,
                        "description": "Spacious hall/lounge with parking, air-conditioning, and audio access.",
                        "matchReason": "Affordable hourly or day booking via OYO Townhouse.",
                        "url": "https://www.oyorooms.com",
                        "rating": 4.5,
                        "tag": "Verified Space"
                    }
                ]
            },
            {
                "category": "Decoration & Lighting",
                "allocatedAmount": dec_amt,
                "percentage": 18,
                "vendorSuggestions": [
                    {
                        "id": "dec-1",
                        "name": f"{req.eventType} Balloon Arch & Photo Backdrop Kit",
                        "category": "Decor",
                        "platform": "Amazon",
                        "price": dec_amt,
                        "currency": req.currency,
                        "description": "Complete DIY festive arch with fairy lights and banner.",
                        "matchReason": "High visual photo impact under 30 minutes assembly.",
                        "url": "https://www.amazon.in",
                        "rating": 4.6
                    }
                ]
            },
            {
                "category": "Entertainment & Sound",
                "allocatedAmount": ent_amt,
                "percentage": 15,
                "vendorSuggestions": [
                    {
                        "id": "ent-1",
                        "name": "Wireless Karaoke Soundbar & Party Games Pack",
                        "category": "Sound",
                        "platform": "Flipkart",
                        "price": ent_amt,
                        "currency": req.currency,
                        "description": "Portable 80W party speaker with dual mics and interactive icebreakers.",
                        "matchReason": "Replaces costly DJ rental with engaging guest activities.",
                        "url": "https://www.flipkart.com",
                        "rating": 4.7,
                        "tag": "Crowd Favorite"
                    }
                ]
            }
        ],
        "timelineChecklist": [
            {"phase": "2 Weeks Before", "action": f"Confirm guest RSVPs ({req.guestCount}) and finalize venue reservation on OYO.", "deadline": "D-14"},
            {"phase": "5 Days Before", "action": "Order decor kit and audio gear on Amazon/Flipkart.", "deadline": "D-5"},
            {"phase": "2 Days Before", "action": f"Lock catering menu and delivery window with Zomato/Swiggy.", "deadline": "D-2"},
            {"phase": "Event Day", "action": "Set up photo corner, test sound system, and welcome guests.", "deadline": "D-0"}
        ],
        "tips": [
            "Keep finger foods circulating early during welcome mingling.",
            "Designate one room or corner with fairy lights specifically as a photo spot."
        ]
    }


# ---------------- SCENARIO 3: JEWELRY MULTIMODAL UTILS ----------------

def generate_jewelry_plan(req: JewelryPlanRequest) -> Dict[str, Any]:
    system_instruction = (
        "You are PocketSmart AI's Multimodal Jewelry & Outfit Stylist. "
        "Analyze occasion, style, budget, and any uploaded outfit photo. "
        "Detect color palette, neckline, and recommend harmonizing jewelry pieces from Tanishq, CaratLane, Amazon, Flipkart. "
        "Return pure JSON conforming to JewelryPlanResponse structure."
    )
    user_prompt = (
        f"Total Budget: {req.currency} {req.budget}\n"
        f"Occasion: {req.occasion}\n"
        f"Style: {req.style}\n"
        f"Metal Preference: {req.metalPreference or 'Auto-select'}\n"
        f"Outfit Description: {req.outfitDescription or 'Festive outfit'}"
    )

    try:
        return call_gemini_api(system_instruction, user_prompt, req.outfitImageBase64, req.outfitImageMimeType or "image/jpeg")
    except Exception as e:
        print(f"[GeminiUtils] Fallback jewelry generator triggered: {e}")
        return get_fallback_jewelry_plan(req)

def get_fallback_jewelry_plan(req: JewelryPlanRequest) -> Dict[str, Any]:
    b = req.budget
    metal = req.metalPreference if req.metalPreference and "Auto" not in req.metalPreference else "Yellow Gold & Kundan"

    neck_p = round(b * 0.42)
    ear_p = round(b * 0.28)
    bang_p = round(b * 0.18)
    ring_p = round(b * 0.12)
    total_est = neck_p + ear_p + bang_p + ring_p

    return {
        "totalBudget": b,
        "totalEstimatedCost": total_est,
        "currency": req.currency,
        "occasion": req.occasion,
        "aestheticAnalysis": {
            "outfitColorsDetected": ["Royal Blue", "Warm Gold Zari", "Subtle Crimson"],
            "necklineDetected": "Sweetheart / Collar Silhouette (Ideal for Chokers & Layered Collars)",
            "recommendedMetal": metal,
            "overallVibe": f"Regal {req.style} coordinated for {req.occasion}"
        },
        "recommendations": [
            {
                "pieceType": "Necklace / Choker",
                "item": {
                    "id": "j-neck-1",
                    "name": f"{req.style} Statement Choker Set",
                    "category": "Necklace",
                    "platform": "Tanishq",
                    "price": neck_p,
                    "currency": req.currency,
                    "description": f"Intricate {metal} choker designed to frame the collarbone.",
                    "matchReason": "Flawlessly complements neckline without clashing with embroidery.",
                    "url": "https://www.tanishq.co.in",
                    "rating": 4.9,
                    "tag": "Signature Match"
                }
            },
            {
                "pieceType": "Earrings / Jhumkas",
                "item": {
                    "id": "j-ear-1",
                    "name": f"Chandbali Pearl Drop Earrings in {metal}",
                    "category": "Earrings",
                    "platform": "CaratLane",
                    "price": ear_p,
                    "currency": req.currency,
                    "description": "Lightweight danglers with micro-pearl tassels for festive luster.",
                    "matchReason": "Matches necklace design motif with comfortable all-evening wear.",
                    "url": "https://www.caratlane.com",
                    "rating": 4.8
                }
            },
            {
                "pieceType": "Bangles / Bracelets",
                "item": {
                    "id": "j-bang-1",
                    "name": "Kada Pair with Floral Carvings",
                    "category": "Wristwear",
                    "platform": "Amazon",
                    "price": bang_p,
                    "currency": req.currency,
                    "description": "Traditional openable bangles with antique finish and secure lock.",
                    "matchReason": "Adds rhythmic sparkle to hand gestures.",
                    "url": "https://www.amazon.in",
                    "rating": 4.6
                }
            },
            {
                "pieceType": "Rings",
                "item": {
                    "id": "j-ring-1",
                    "name": "Solitaire CZ Adjustable Cocktail Ring",
                    "category": "Ring",
                    "platform": "Flipkart",
                    "price": ring_p,
                    "currency": req.currency,
                    "description": "Bold cocktail ring with floral halo crown.",
                    "matchReason": "Completes the four-piece collection within budget.",
                    "url": "https://www.flipkart.com",
                    "rating": 4.5
                }
            }
        ],
        "stylingTips": [
            "For heavy embroidered outfits, let the choker be the centerpiece and skip long haars.",
            "Coordinate warm gold tones with warm lipstick undertones for balanced photography."
        ]
    }
