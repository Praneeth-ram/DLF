from pydantic import BaseModel, EmailStr
from typing import Optional

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

class PropertyCreate(BaseModel):
    title: str
    address: str
    city: str
    state: str
    property_type: Optional[str] = "residential"

class PropertyOut(BaseModel):
    id: int
    title: str
    address: str
    city: str
    state: str
    property_type: Optional[str]
    owner_id: int
    document_code: Optional[str]

    class Config:
        orm_mode = True
