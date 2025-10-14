from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .config import settings

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="FastAPI backend for DLF Property Management System"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Health Check"])
def health_check():
    return {
        "status": "healthy",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }

# include routers
from .routes import auth as auth_routes, properties as prop_routes, documents as doc_routes
app.include_router(auth_routes.router, prefix='/api/auth', tags=['Authentication'])
app.include_router(prop_routes.router, prefix='/api/properties', tags=['Properties'])
app.include_router(doc_routes.router, prefix='/api/documents', tags=['Documents'])
