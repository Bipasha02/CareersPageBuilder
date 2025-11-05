# server/app/routes/feature_settings.py
from fastapi import APIRouter, Request, HTTPException

router = APIRouter()

# Temporary in-memory storage (until DB integration)
settings_storage = {}

@router.post("/api/save-features")
async def save_features(request: Request):
    """
    Accepts any JSON body for feature settings.
    This is a mock handler, no strict validation.
    """
    try:
        data = await request.json()
        print("✅ Received raw data:", data)
    except Exception as e:
        print("⚠️ Error parsing request body:", e)
        data = {}

    # If company_id exists in the data, save it; otherwise ignore
    company_id = data.get("company_id")
    if company_id:
        settings_storage[company_id] = data

    return {"ok": True, "message": "Features saved (mock response)", "data": data}


@router.get("/api/get-features/{company_id}")
async def get_features(company_id: str):
    """
    Returns stored feature settings for a company.
    """
    if company_id not in settings_storage:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings_storage[company_id]
