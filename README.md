# PocketSmart AI - AI-Powered Budget Planning for Everyday Needs

![PocketSmart AI](https://img.shields.io/badge/Gemini_1.5_Flash-Multimodal_AI-4361EE?style=for-the-badge&logo=google)
![Next.js](https://img.shields.io/badge/Next.js_15-Vercel_Ready-000000?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Python_Backend-009688?style=for-the-badge&logo=fastapi)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**PocketSmart AI** is a GenAI-powered, cross-platform budget recommendation web application designed to eliminate financial guesswork and shopping overwhelm across home decor, event planning, and jewelry purchases.

Powered by **Google Gemini 1.5 Flash**, PocketSmart AI analyzes user preferences, exact budget limits, room dimensions, guest counts, and **multimodal outfit photographs** to generate curated, price-adherent recommendations sourced from trusted e-commerce ecosystems including **Amazon, Flipkart, IKEA, Pepperfry, Swiggy, Zomato, OYO, Tanishq, and CaratLane**.

---

## 🌟 Key Features & Scenario Modules

### 🛋️ 1. Home Interior Budget Planner (`/home-planner`)
- **Budget-Balanced Decorating:** Enter your total budget in ₹ INR or $ USD and select multiple rooms (Living Room, Master Bedroom, Kitchen, Dining Room, Home Office, Balcony).
- **Item & Quantity Customization:** Specify requirements for sofas, ceiling fans, ambient lights, dining tables, rugs, curtains, and planters.
- **Cross-Platform Sourcing:** Curates realistic furniture, fixtures, and soft furnishings from **IKEA, Amazon, Pepperfry, and Flipkart**.
- **Designer Advice:** Room-by-room design tips matching aesthetic themes (Modern Contemporary, Minimalist, Scandinavian, Traditional Indian, Bohemian, Industrial).
- **Budget Adherence Gauge:** Visual progress indicator tracking expenditure, buffer reserves, and platform links.

### 🎉 2. Party & Event Budget Planner (`/party-planner`)
- **Proportional Budget Allocation:** Automatically divides party funds:
  - **Catering & Beverages (45%):** Bulk catering & snacks from **Zomato** and **Swiggy**.
  - **Venue & Stays (22%):** Verified event party halls and stay villas on **OYO Townhouse** / Airbnb.
  - **Decorations (18%):** Balloon arches and fairy lights on **Amazon**.
  - **Entertainment & Audio (15%):** Bluetooth party speakers, karaoke mics, and games on **Flipkart**.
- **Per-Guest Cost Metric:** Dynamically recalculates cost per guest based on interactive guest count sliders (5 to 200+ guests).
- **Countdown Checklist:** Step-by-step timeline covering 2 weeks before, 5 days before, 2 days before, and event day morning.

### 💎 3. Jewelry & Occasion Planner (`/jewelry-planner`)
- **Multimodal AI Vision:** Upload a photo of your outfit (saree, lehenga, gown, suit).
- **Color & Silhouette Analysis:** Gemini 1.5 Flash scans the image to detect base fabric colors, embroidery/zari warmth, and blouse/dress neckline geometry.
- **Coordinated Set Recommendations:** Curates matching pieces:
  - Statement Necklace / Choker (matched to neckline)
  - Chandbalis / Jhumkas / Studs (matched to face profile)
  - Kadas / Bangles / Bracelets
  - Cocktail Rings & Accent Accessories
- **Platform Partners:** Handpicked from **Tanishq, CaratLane, Amazon, and Flipkart**.

### 📜 4. Saved History & Audit Log (`/history`)
- Automatically archives past recommendation blueprints.
- Filter past queries by category (Home, Party, Jewelry).
- Re-inspect, compare, print, or export plans anytime.

### 🔐 5. Authentication & Session Management (`/auth`)
- User registration, login, and JWT session handling.
- Instant **"One-Click Demo Guest Mode"** for frictionless evaluation and testing.

---

## 🚀 Dual Architecture: Vercel Ready + Python FastAPI

PocketSmart AI includes two complete implementations:
1. **Next.js Full-Stack App (Root):** Modern, glassmorphic UI matching the project specifications. Deploys to **Vercel** with 1 click!
2. **Python FastAPI Backend (`backend/`):** Standalone modular Python backend with `app.py`, `gemini_utils.py`, `schemas.py`, `auth.py`, and Jinja2 templates matching the academic project rubric.

---

## 💻 Local Setup & Running Instructions

### Prerequisites
- Node.js (v18+)
- (Optional for Python backend) Python 3.10+

### Option A: Run Next.js Full-Stack (Recommended for Vercel)

1. Clone or open the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pocketsmart-ai.git
   cd pocketsmart-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set your Gemini API Key in `.env.local`:
   ```env
   GEMINI_API_KEY=AIzaSy...
   ```
   > *Note:* PocketSmart AI includes an intelligent fallback generator, so the app works seamlessly even without an API key!

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open your browser:
   ```
   http://localhost:3000
   ```

---

### Option B: Run Python FastAPI Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate:
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```

3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```

4. Run FastAPI with Uvicorn:
   ```bash
   uvicorn app:app --reload --port 8000
   ```

5. Open in browser:
   ```
   http://localhost:8000
   API Docs: http://localhost:8000/docs
   ```

---

## 🌐 Hosting on GitHub

Follow these steps in your terminal inside the project directory:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: PocketSmart AI fullstack application with Gemini 1.5 Flash"

# 4. Create a new repository on GitHub (e.g. pocketsmart-ai)
# 5. Link and push to your GitHub repository:
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/pocketsmart-ai.git
git push -u origin main
```

---

## ☁️ Hosting Live on Vercel

1. **Sign in to Vercel:** Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. **Add New Project:** Click **"Add New..."** > **"Project"**.
3. **Import Git Repository:** Select your `pocketsmart-ai` repository.
4. **Configure Project:**
   - Framework Preset: **Next.js** (automatically detected)
   - Root Directory: `./`
5. **Environment Variables:**
   - Add `GEMINI_API_KEY`: *(Your Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey))*
6. **Click "Deploy":**
   Vercel will build the project and provide you with a live production URL (e.g., `https://pocketsmart-ai.vercel.app`) in under 60 seconds!

---

## 📂 Project Structure

```
PACKETSMARTAI/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-home/route.ts      # Home interior AI generation API
│   │   │   ├── generate-party/route.ts     # Party & event AI allocation API
│   │   │   └── generate-jewelry/route.ts   # Multimodal jewelry vision API
│   │   ├── auth/page.tsx                   # User login, registration & guest mode
│   │   ├── history/page.tsx                # Recommendation history & logs
│   │   ├── home-planner/page.tsx           # Home Interior Planner UI
│   │   ├── party-planner/page.tsx          # Party Budget Planner UI
│   │   ├── jewelry-planner/page.tsx        # Multimodal Jewelry Planner UI
│   │   ├── globals.css                     # Dark navy glassmorphic design system
│   │   ├── layout.tsx                      # Main layout with Navbar & Footer
│   │   └── page.tsx                        # Hero landing page
│   ├── components/
│   │   ├── Navbar.tsx                      # Top navigation bar
│   │   ├── Footer.tsx                      # Platform badges and footer
│   │   ├── BudgetGauge.tsx                 # Real-time budget progress bar
│   │   └── PlatformBadge.tsx               # Sourcing badges (Amazon, IKEA, etc.)
│   └── lib/
│       ├── gemini.ts                       # Google Gemini 1.5 Flash client
│       ├── mockData.ts                     # Smart fallback recommendation generator
│       ├── storage.ts                      # LocalStorage & user session persistence
│       └── types.ts                        # TypeScript interfaces
├── backend/                                # Python FastAPI Backend Module
│   ├── app.py                              # FastAPI main server & routes
│   ├── main.py                             # Uvicorn entry point
│   ├── gemini_utils.py                     # Python Gemini integration & fallbacks
│   ├── schemas.py                          # Pydantic data models
│   ├── auth.py                             # JWT token authentication
│   ├── requirements.txt                    # Python dependencies
│   └── templates/                          # Jinja2 HTML templates
│       ├── base.html
│       ├── index.html
│       ├── home_planner.html
│       ├── party_planner.html
│       └── jewelry_planner.html
├── package.json                            # Next.js & React dependencies
├── tsconfig.json                           # TypeScript configuration
├── next.config.mjs                         # Next.js configuration
├── vercel.json                             # Vercel deployment configuration
├── .gitignore                              # Git exclusion rules
└── README.md                               # Project documentation
```

---

## 👥 Contributors & Acknowledgements
- Developed for **PocketSmart AI** mini-project.
- Foundation Model: **Google Gemini 1.5 Flash Pro** (`gemini-1.5-flash`).
- Built with **Next.js 15**, **FastAPI**, and **TypeScript**.
