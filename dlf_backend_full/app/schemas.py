from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# class PropertyCreate(BaseModel):
#     title: str
#     address: str
#     city: str
#     state: str
#     property_type: Optional[str] = "residential"

class PropertyOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    price: float
    location: str
    address: Optional[str] = None
    property_type: Optional[str] = None
    property_sub_type: Optional[str] = None
    category: str
    area: Optional[float] = None
    carpet_area: Optional[float] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    owner_id: int
    owner: Optional[UserOut]
    document_code: Optional[str]

    class Config:
        orm_mode = True

#new code joined


class PropertyBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    location: str
    address: Optional[str] = None
    property_type: str
    property_sub_type: Optional[str] = None
    category: str
    area: Optional[float] = None
    carpet_area: Optional[float] = None
    owner_id: Optional[str] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    balconies: Optional[int] = None
    floor_number: Optional[int] = None
    total_floors: Optional[int] = None
    facing: Optional[str] = None
    amenities: Optional[List[str]] = None
    is_active: bool = True

    class Config:
        orm_mode = True

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    location: Optional[str] = None
    address: Optional[str] = None
    property_type: Optional[str] = None
    property_sub_type: Optional[str] = None
    category: Optional[str] = None
    user_id: Optional[int] = None
    area: Optional[float] = None
    carpet_area: Optional[float] = None
    owner: Optional[str] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    is_active: Optional[bool] = None

class Property(PropertyBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class PropertyListResponse(BaseModel):
    properties: List[PropertyOut]
    total: int
    page: int
    pages: int
