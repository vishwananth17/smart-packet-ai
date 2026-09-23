from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Literal

class ProductRecommendation(BaseModel):
    id: str
    name: str
    category: str
    platform: Literal['Amazon', 'IKEA', 'Flipkart', 'Pepperfry', 'Urban Ladder', 'Swiggy', 'Zomato', 'OYO', 'Tanishq', 'CaratLane', 'Other']
    price: float
    currency: Literal['INR', 'USD'] = 'INR'
    description: str
    matchReason: str
    url: str
    rating: Optional[float] = 4.5
    tag: Optional[str] = None

# Scenario 1: Home Interior
class HomePlanRequest(BaseModel):
    budget: float = Field(..., gt=0, description="Total budget limit")
    currency: Literal['INR', 'USD'] = 'INR'
    rooms: List[str] = Field(..., min_items=1)
    style: str = "Modern Contemporary"
    items: Optional[Dict[str, int]] = {}
    notes: Optional[str] = None

class RoomBreakdown(BaseModel):
    room: str
    allocatedBudget: float
    estimatedCost: float
    items: List[ProductRecommendation]
    designTips: List[str]

class HomePlanResponse(BaseModel):
    totalBudget: float
    totalEstimatedCost: float
    currency: Literal['INR', 'USD']
    budgetAdherencePercentage: int
    summary: str
    roomBreakdowns: List[RoomBreakdown]
    generalTips: List[str]
    costSavingAdvice: str
    suggestedPlatforms: List[str]

# Scenario 2: Party Planner
class PartyPlanRequest(BaseModel):
    budget: float = Field(..., gt=0)
    currency: Literal['INR', 'USD'] = 'INR'
    guestCount: int = Field(..., gt=0)
    eventType: str = "Birthday Celebration"
    venueType: str = "Home / Backyard"
    foodPreference: str = "Multi-course Buffet"
    specialRequests: Optional[str] = None

class CategoryAllocation(BaseModel):
    category: str
    allocatedAmount: float
    percentage: int
    vendorSuggestions: List[ProductRecommendation]

class TimelineTask(BaseModel):
    phase: str
    action: str
    deadline: str

class PartyPlanResponse(BaseModel):
    totalBudget: float
    totalEstimatedCost: float
    currency: Literal['INR', 'USD']
    guestCount: int
    eventType: str
    costPerGuest: float
    allocations: List[CategoryAllocation]
    timelineChecklist: List[TimelineTask]
    tips: List[str]

# Scenario 3: Jewelry Recommendations
class JewelryPlanRequest(BaseModel):
    budget: float = Field(..., gt=0)
    currency: Literal['INR', 'USD'] = 'INR'
    occasion: str = "Wedding / Reception"
    style: str = "Traditional Indian & Heritage"
    metalPreference: Optional[str] = None
    outfitDescription: Optional[str] = None
    outfitImageBase64: Optional[str] = None
    outfitImageMimeType: Optional[str] = "image/jpeg"

class AestheticAnalysis(BaseModel):
    outfitColorsDetected: List[str]
    necklineDetected: str
    recommendedMetal: str
    overallVibe: str

class JewelryPiece(BaseModel):
    pieceType: str
    item: ProductRecommendation

class JewelryPlanResponse(BaseModel):
    totalBudget: float
    totalEstimatedCost: float
    currency: Literal['INR', 'USD']
    occasion: str
    aestheticAnalysis: AestheticAnalysis
    recommendations: List[JewelryPiece]
    stylingTips: List[str]

# Auth Schemas
class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserInDB(BaseModel):
    id: str
    name: str
    email: str
    hashed_password: str
    is_active: bool = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    name: str
    email: str
