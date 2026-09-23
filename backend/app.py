import os
import uvicorn
from typing import Optional, List
from fastapi import FastAPI, Request, Depends, HTTPException, status, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse

from schemas import (
    HomePlanRequest, HomePlanResponse,
    PartyPlanRequest, PartyPlanResponse,
    JewelryPlanRequest, JewelryPlanResponse,
    UserRegister, UserLogin, UserInDB, Token
)
from auth import (
    USERS_DB, verify_password, get_password_hash, create_access_token,
    get_current_active_user, get_current_user
)
from gemini_utils import (
    generate_home_plan, generate_party_plan, generate_jewelry_plan
)

app = FastAPI(
    title="PocketSmart AI",
    description="GenAI-Powered Cross-Platform Budget Recommendation Engine (FastAPI & Gemini 1.5 Flash)",
    version="1.0.0"
)

# CORS setup for cross-origin frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Jinja2 template setup
templates_dir = os.path.join(os.path.dirname(__file__), "templates")
os.makedirs(templates_dir, exist_ok=True)
templates = Jinja2Templates(directory=templates_dir)

# In-memory recommendation history store
RECOMMENDATION_HISTORY = []

# ----------------- HTML / TEMPLATE ROUTES -----------------

@app.get("/", response_class=HTMLResponse)
async def home_page(request: Request, current_user: Optional[UserInDB] = Depends(get_current_user)):
    """Main landing page introducing PocketSmart AI features"""
    return templates.TemplateResponse("index.html", {
        "request": request,
        "user": current_user
    })

@app.get("/home-planner", response_class=HTMLResponse)
async def home_planner_page(request: Request, current_user: UserInDB = Depends(get_current_active_user)):
    """Home interior budget planner page"""
    return templates.TemplateResponse("home_planner.html", {
        "request": request,
        "user": current_user
    })

@app.get("/party-planner", response_class=HTMLResponse)
async def party_planner_page(request: Request, current_user: UserInDB = Depends(get_current_active_user)):
    """Party & event budget planner page"""
    return templates.TemplateResponse("party_planner.html", {
        "request": request,
        "user": current_user
    })

@app.get("/jewelry-planner", response_class=HTMLResponse)
async def jewelry_planner(request: Request, current_user: UserInDB = Depends(get_current_active_user)):
    """Jewelry budget planner page (multimodal text + image)"""
    return templates.TemplateResponse("jewelry_planner.html", {
        "request": request,
        "user": current_user
    })


# ----------------- AI GENERATION API ENDPOINTS -----------------

@app.post("/generate-home", response_model=HomePlanResponse)
@app.post("/api/generate-home", response_model=HomePlanResponse)
async def api_generate_home(req: HomePlanRequest, current_user: Optional[UserInDB] = Depends(get_current_user)):
    """
    Accepts home-related preferences and budget to return tailored product suggestions
    across IKEA, Amazon, Pepperfry, Urban Ladder, and Flipkart.
    """
    result = generate_home_plan(req)
    RECOMMENDATION_HISTORY.append({
        "type": "home",
        "user": current_user.email if current_user else "guest",
        "budget": req.budget,
        "data": result
    })
    return result

@app.post("/generate-party", response_model=PartyPlanResponse)
@app.post("/api/generate-party", response_model=PartyPlanResponse)
async def api_generate_party(req: PartyPlanRequest, current_user: Optional[UserInDB] = Depends(get_current_user)):
    """
    Processes party details and guest count to recommend venue, food, and decoration items
    from Swiggy, Zomato, OYO, and Amazon.
    """
    result = generate_party_plan(req)
    RECOMMENDATION_HISTORY.append({
        "type": "party",
        "user": current_user.email if current_user else "guest",
        "budget": req.budget,
        "data": result
    })
    return result

@app.post("/generate-jewelry", response_model=JewelryPlanResponse)
@app.post("/api/generate-jewelry", response_model=JewelryPlanResponse)
async def api_generate_jewelry(req: JewelryPlanRequest, current_user: Optional[UserInDB] = Depends(get_current_user)):
    """
    Uses text and optional outfit image inputs to suggest style-matched jewelry
    from Tanishq, CaratLane, Amazon, and Flipkart.
    """
    result = generate_jewelry_plan(req)
    RECOMMENDATION_HISTORY.append({
        "type": "jewelry",
        "user": current_user.email if current_user else "guest",
        "budget": req.budget,
        "data": result
    })
    return result


# ----------------- AUTHENTICATION & SESSION ENDPOINTS -----------------

@app.post("/register")
async def register_user(data: UserRegister):
    """Handles new user registration by accepting and securely storing user credentials"""
    if data.email in USERS_DB:
        raise HTTPException(status_code=400, detail="Email is already registered")

    user_id = f"usr_{len(USERS_DB) + 1}"
    new_user = UserInDB(
        id=user_id,
        name=data.name,
        email=data.email,
        hashed_password=get_password_hash(data.password),
        is_active=True
    )
    USERS_DB[data.email] = new_user

    access_token = create_access_token(data={"sub": new_user.email})
    return {
        "message": "User registered successfully",
        "token": access_token,
        "user": {"id": new_user.id, "name": new_user.name, "email": new_user.email}
    }

@app.post("/login")
@app.post("/token", response_model=Token)
async def login_for_access_token(data: UserLogin):
    """Authenticates user credentials and issues a secure JWT token"""
    user = USERS_DB.get(data.email)
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "name": user.name,
        "email": user.email
    }

@app.post("/logout")
async def logout():
    """Terminates current session"""
    return {"message": "Logged out successfully"}

@app.get("/session-info")
@app.get("/session-data")
async def session_info(current_user: UserInDB = Depends(get_current_active_user)):
    """Retrieves metadata about current user session and past queries"""
    user_history = [h for h in RECOMMENDATION_HISTORY if h["user"] == current_user.email]
    return {
        "user_id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "history_count": len(user_history),
        "history": user_history
    }

# ----------------- STARTUP & RUNNER -----------------

@app.on_event("startup")
async def startup_event():
    """Initializes essential application services and configuration settings"""
    print("[PocketSmart AI] FastAPI backend started successfully. Gemini 1.5 Flash engine ready.")

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
