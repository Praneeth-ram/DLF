from fastapi import FastAPI
from .database import engine
from . import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title='DLF Property Management API Demo')

@app.get('/')
def home():
    return {'message': 'DLF Property Management Backend Demo Running'}

# include routers
from .routes import auth as auth_routes, properties as prop_routes, documents as doc_routes
app.include_router(auth_routes.router, prefix='/api/auth', tags=['auth'])
app.include_router(prop_routes.router, prefix='/api/properties', tags=['properties'])
app.include_router(doc_routes.router, prefix='/api/documents', tags=['documents'])
