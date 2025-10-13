DLF Property Management Backend Demo (SQLite)
===========================================

This is a demo backend for the DLF Property Management project. It uses FastAPI + SQLAlchemy + SQLite so you can run it locally without additional DB setup.

How to run:

1. Create and activate virtualenv:
   python -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\activate

2. Install requirements:
   pip install -r requirements.txt

3. Seed demo data (creates demo.db and populates users/properties):
   python -m app.scripts.seed_data

4. Run the server:
   uvicorn app.main:app --reload --port 8000

Endpoints:
 - GET / -> welcome
 - POST /api/auth/register
 - POST /api/auth/login  (use form fields: username, password)
 - Protected routes require Authorization: Bearer <token>

Note: document codes are 16-character strings stored in properties.document_code.
