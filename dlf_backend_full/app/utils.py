import random, string
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from .config import settings

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_minutes: int = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=(expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({'exp': expire})
    encoded = jwt.encode(to_encode, settings.SECRET_KEY, algorithm='HS256')
    return encoded

SPECIAL = "!@#$%^&*()-_+=<>?"

def generate_16_char_code():
    uppercase = string.ascii_uppercase
    lowercase = string.ascii_lowercase
    digits = string.digits
    all_chars = uppercase + lowercase + digits + SPECIAL

    code = [
        random.choice(uppercase),
        random.choice(lowercase),
        random.choice(digits),
        random.choice(SPECIAL)
    ]
    code += random.choices(all_chars, k=16-4)
    random.shuffle(code)
    return ''.join(code)
