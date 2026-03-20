from fastapi import FastAPI, Request, HTTPException
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

N8N_WEBHOOK_URL = os.getenv("N8N_WEBHOOK_URL")
VERCEL_URL = os.getenv("VERCEL_URL", "unknown")

@app.post("/api/submit")
@app.post("/submit")
async def submit_form(request: Request):
    path = request.url.path
    print(f"Received request on path: {path}")
    
    if not N8N_WEBHOOK_URL:
        print("CRITICAL: N8N_WEBHOOK_URL is missing")
        raise HTTPException(status_code=500, detail="Backend configuration error: Missing Webhook URL")
    
    try:
        data = await request.json()
        print(f"Data keys received: {list(data.keys())}")
        
        # Check for honeypot
        if data.get("confirm_email_address_verification"):
            print("Bot detection triggered")
            return {"message": "Success"}
        
        print(f"Forwarding to n8n: {N8N_WEBHOOK_URL[:20]}...")
        response = requests.post(
            N8N_WEBHOOK_URL,
            json={
                "source": "VISCVLE Event Form (FastAPI)",
                "host": VERCEL_URL,
                **data
            },
            timeout=15
        )
        
        print(f"n8n response status: {response.status_code}")
        if response.status_code >= 400:
            raise HTTPException(status_code=502, detail=f"Target server error: {response.status_code}")
            
        return {"message": "Success"}
        
    except Exception as e:
        print(f"CRASH during submission: {str(e)}")
        # Return the actual error for debugging
        raise HTTPException(status_code=500, detail=f"Submission failed: {str(e)}")

@app.get("/")
@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "env_check": {
            "webhook_set": bool(N8N_WEBHOOK_URL),
            "vercel_url": VERCEL_URL
        }
    }
