# PocketSmart AI: Intelligent Cross-Platform Budget Recommendation System

## Overview

PocketSmart AI is an artificial intelligence-driven recommendation platform designed to automate and optimize lifestyle budget allocations. By integrating Google's Gemini 1.5 Flash foundation model with cross-platform e-commerce search paradigms, the system generates structured, price-constrained product and service recommendations across three lifestyle domains:

1. **Home Interior Decoration**: Room-by-room architectural planning, furniture sourcing, and lighting fixtures balancing aesthetic styles and budgetary constraints across IKEA, Amazon, and Pepperfry.
2. **Event and Party Coordination**: Proportional budget distribution across catering, accommodation, decoration, and audio entertainment across Swiggy, Zomato, OYO, and Amazon.
3. **Multimodal Jewelry Matching**: Visual feature extraction from uploaded outfit photographs (analyzing color harmony, neckline geometry, and metal undertones) to recommend coordinating jewelry sets across Tanishq, CaratLane, Amazon, and Flipkart.

The system features dual deployment capabilities: a high-performance Next.js 15 full-stack web application optimized for Vercel serverless deployment, alongside a standalone Python FastAPI backend module adhering to academic project specifications.

---

## Architecture

### System Flow Diagram

```
+---------------------------------------------------------------------------------+
|                                USER INTERFACE                                   |
|   Next.js 15 (React 19) / Responsive Glassmorphic UI / Jinja2 Template Engine   |
+---------------------------------------------------------------------------------+
                                      |
                                      v
+---------------------------------------------------------------------------------+
|                               API GATEWAY LAYER                                 |
|         POST /api/generate-home  |  POST /api/generate-party                   |
|         POST /api/generate-jewelry  |  POST /api/auth                           |
+---------------------------------------------------------------------------------+
                                      |
         +----------------------------+----------------------------+
         |                                                         |
         v                                                         v
+------------------------------------+   +---------------------------------------+
|     MULTIMODAL AI SERVICE          |   |       ALGORITHMIC FALLBACK            |
|   Google Gemini 1.5 Flash Engine   |   |        SYNTHESIS ENGINE               |
|   - Vision: Outfit feature parsing |   |   - Strict category budget bounds     |
|   - Text: Contextual prompt logic  |   |   - Platform catalog mapping          |
+------------------------------------+   +---------------------------------------+
                                      |
                                      v
+---------------------------------------------------------------------------------+
|                        NORMALIZED RECOMMENDATION ENGINE                         |
|   - Budget Adherence Verification (Price <= Budget Ceiling)                     |
|   - Multi-Vendor Price Allocation (Catering, Venue, Decor, Furniture)           |
|   - Session State & History Persistence (LocalStorage / JWT Token Store)        |
+---------------------------------------------------------------------------------+
                                      |
                                      v
+---------------------------------------------------------------------------------+
|                          CROSS-PLATFORM SOURCING                                |
|        Amazon  |  Flipkart  |  IKEA  |  Pepperfry  |  Swiggy  |  Zomato  |  OYO |
+---------------------------------------------------------------------------------+
```

---

## Core Modules

### 1. Home Interior Budget Planner (`/home-planner`)
- **Input Parameters**: Total budget (INR/USD), target rooms (Living Room, Bedroom, Kitchen, Dining Room, Home Office, Balcony), design style (Modern Contemporary, Minimalist, Scandinavian, Traditional Indian, Bohemian, Industrial), and specific fixture quantities.
- **Processing**: The model evaluates room dimensions, functional requirements, and style guidelines to partition the budget proportionally.
- **Output**: Detailed room-by-room itemized recommendations with platform verification badges, direct product search links, design tips, and an automated budget adherence gauge.

### 2. Party and Event Budget Planner (`/party-planner`)
- **Input Parameters**: Total budget, attendee count (5 to 200+ guests), occasion type (Birthday, Wedding, Anniversary, Corporate, House Party), venue preference, and catering preferences.
- **Budget Allocation Logic**:
  - Catering and Food: 45% (sourcing via Zomato and Swiggy)
  - Venue and Stays: 22% (sourcing via OYO Townhouse and Airbnb)
  - Decoration and Lighting: 18% (sourcing via Amazon)
  - Entertainment and Audio: 15% (sourcing via Flipkart)
- **Output**: Per-guest expenditure calculations, category-level itemization, and a four-phase event countdown checklist.

### 3. Multimodal Jewelry Recommendation Engine (`/jewelry-planner`)
- **Input Parameters**: Budget, occasion, metal preference, and an optional image upload of the user's attire (PNG, JPEG, WEBP).
- **Vision Processing**: The Gemini 1.5 Flash Vision engine processes base64-encoded image payloads to extract:
  - Dominant and secondary garment color hexes.
  - Neckline silhouette (Sweetheart, V-neck, Boat neck, Collar).
  - Embroidery and embellishment tone (Antique Gold, Silver, Rose Gold).
- **Output**: Coordinated four-piece jewelry collections (Necklace/Choker, Earrings, Bangles/Kadas, Cocktail Ring) from Tanishq, CaratLane, and Amazon within strict financial limits.

### 4. Recommendation History and Audit Log (`/history`)
- Records recommendation queries with timestamps, budget parameters, and full item listings.
- Provides search, filtering by domain, and print/export utility.

### 5. Authentication and Session Management (`/auth`)
- User account creation, authentication, and JWT session handling.
- Integrated one-click evaluation access allowing seamless evaluation without mandatory credentials.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling & Design System** | Vanilla CSS3, Custom Glassmorphism, Responsive CSS Grid, Inter/Outfit Typography |
| **Icons & Micro-Interactions** | Lucide React |
| **AI Foundation Model** | Google Gemini 1.5 Flash (`gemini-1.5-flash`), Multimodal Vision API |
| **Secondary Backend** | Python 3.10+, FastAPI, Uvicorn, Pydantic v2, Jinja2 Templates |
| **Deployment Platforms** | Vercel (Edge/Serverless), GitHub (Version Control) |

---

## API Specifications

### `POST /api/generate-home`
Generates itemized interior decoration plans based on room configurations and budget constraints.

**Request Payload:**
```json
{
  "budget": 50000,
  "currency": "INR",
  "rooms": ["Living Room", "Master Bedroom"],
  "style": "Modern Contemporary",
  "items": { "3-Seater Sofa": 1, "Coffee Table": 1 },
  "notes": "Prefer neutral beige upholstery"
}
```

**Response Payload:**
```json
{
  "totalBudget": 50000,
  "totalEstimatedCost": 42000,
  "currency": "INR",
  "budgetAdherencePercentage": 84,
  "summary": "Tailored Modern Contemporary interior plan across Living Room and Master Bedroom.",
  "roomBreakdowns": [
    {
      "room": "Living Room",
      "allocatedBudget": 25000,
      "estimatedCost": 22000,
      "items": [
        {
          "id": "item-1",
          "name": "Modern Fabric 3-Seater Sofa",
          "category": "Furniture",
          "platform": "IKEA",
          "price": 16000,
          "currency": "INR",
          "description": "Ergonomic neutral-tone sofa.",
          "matchReason": "Optimal price-to-durability ratio.",
          "url": "https://www.ikea.com",
          "rating": 4.6,
          "tag": "Best Value"
        }
      ],
      "designTips": ["Ensure central seating faces natural lighting sources."]
    }
  ],
  "generalTips": ["Order fixtures during promotional periods for extra savings."],
  "costSavingAdvice": "Unallocated buffer of INR 8,000 retained for delivery and assembly.",
  "suggestedPlatforms": ["IKEA", "Amazon", "Pepperfry", "Urban Ladder", "Flipkart"]
}
```

### `POST /api/generate-party`
Calculates proportional allocation for events across venue, catering, decor, and audio.

**Request Payload:**
```json
{
  "budget": 30000,
  "currency": "INR",
  "guestCount": 25,
  "eventType": "Birthday Celebration",
  "venueType": "Home / Backyard",
  "foodPreference": "Multi-course Buffet"
}
```

### `POST /api/generate-jewelry`
Accepts text preferences and an optional base64 image payload to perform multimodal outfit analysis and jewelry pairing.

**Request Payload:**
```json
{
  "budget": 40000,
  "currency": "INR",
  "occasion": "Wedding / Reception",
  "style": "Traditional Indian & Heritage",
  "metalPreference": "Yellow Gold",
  "outfitImageBase64": "data:image/jpeg;base64,...",
  "outfitImageMimeType": "image/jpeg"
}
```

---

## Project Structure

```
PACKETSMARTAI/
|-- src/
|   |-- app/
|   |   |-- api/
|   |   |   |-- generate-home/route.ts       # Interior AI generation API
|   |   |   |-- generate-party/route.ts      # Party allocation API
|   |   |   `-- generate-jewelry/route.ts    # Multimodal jewelry vision API
|   |   |-- auth/page.tsx                    # Authentication and session access
|   |   |-- history/page.tsx                 # Recommendation logs and history
|   |   |-- home-planner/page.tsx            # Home Interior Planner UI
|   |   |-- party-planner/page.tsx           # Party Budget Planner UI
|   |   |-- jewelry-planner/page.tsx         # Multimodal Jewelry Planner UI
|   |   |-- globals.css                      # Design system and animations
|   |   |-- layout.tsx                       # Main layout wrapper
|   |   `-- page.tsx                         # Landing page and simulator
|   |-- components/
|   |   |-- Navbar.tsx                       # Global navigation
|   |   |-- Footer.tsx                       # Platform links and credits
|   |   |-- BudgetGauge.tsx                  # Budget tracking component
|   |   `-- PlatformBadge.tsx                # Vendor identification badges
|   `-- lib/
|       |-- gemini.ts                        # Gemini 1.5 Flash client
|       |-- mockData.ts                      # Fallback data synthesis
|       |-- storage.ts                       # Local persistence layer
|       `-- types.ts                         # TypeScript definitions
|-- backend/                                 # Python FastAPI Reference Module
|   |-- app.py                               # FastAPI application router
|   |-- main.py                              # Application entrypoint
|   |-- gemini_utils.py                      # Python Gemini API connector
|   |-- schemas.py                           # Pydantic data schemas
|   |-- auth.py                              # JWT authentication service
|   |-- requirements.txt                     # Python backend dependencies
|   `-- templates/                           # Standalone Jinja2 templates
|-- package.json                             # Node.js project manifest
|-- tsconfig.json                            # TypeScript configuration
|-- next.config.mjs                          # Next.js build configuration
|-- vercel.json                              # Vercel deployment manifest
|-- .gitignore                               # Git exclusion definitions
`-- README.md                                # System documentation
```

---

## Local Development Setup

### Option 1: Next.js Full-Stack Application (Standard)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vishwananth17/smart-packet-ai.git
   cd smart-packet-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (Optional):**
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *Note: If no API key is provided, the platform automatically activates its intelligent fallback synthesis engine with realistic e-commerce datasets.*

4. **Start the local server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

### Option 2: Python FastAPI Standalone Backend

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Launch the FastAPI server:**
   ```bash
   uvicorn app:app --reload --port 8000
   ```

5. **Access documentation and endpoints:**
   - Web Interface: [http://localhost:8000](http://localhost:8000)
   - OpenAPI Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Deployment Guide

### Version Control (GitHub)

The project is maintained on GitHub under the `main` branch:

```bash
git add .
git commit -m "feat: complete PocketSmart AI fullstack application with Gemini 1.5 Flash"
git push origin main
```

Repository: [https://github.com/vishwananth17/smart-packet-ai](https://github.com/vishwananth17/smart-packet-ai)

### Production Deployment (Vercel)

1. Authenticate at [vercel.com](https://vercel.com) using your GitHub account.
2. Select **"Add New..."** > **"Project"**.
3. Import the `smart-packet-ai` repository.
4. Verify the build configuration:
   - **Framework Preset**: Next.js (Automatic)
   - **Root Directory**: `./`
5. (Optional) Provide `GEMINI_API_KEY` under **Environment Variables**.
6. Select **Deploy**. Vercel will build the production application and issue an SSL-secured live URL within 60 seconds.

---

## Verification and Quality Assurance

The codebase was compiled and validated against the following benchmarks:

| Test Case | Method | Expected Output | Status |
| :--- | :--- | :--- | :--- |
| **Static Build** | `next build` | Zero TypeScript/lint errors, all static and dynamic routes compiled | Passed |
| **Landing Navigation** | `GET /` | HTTP 200, glassmorphic layout, interactive budget simulation | Passed |
| **Home Generation** | `POST /api/generate-home` | HTTP 200, room breakdown under ceiling, valid platform links | Passed |
| **Party Generation** | `POST /api/generate-party` | HTTP 200, 45/22/18/15 proportional split, per-guest metrics | Passed |
| **Jewelry Vision** | `POST /api/generate-jewelry`| HTTP 200, aesthetic analysis, four-piece coordinated matching | Passed |
| **Session Tracking** | Client Storage | Plans persisted across sessions with review/print capabilities | Passed |

---

## License

This project is licensed under the MIT License.
