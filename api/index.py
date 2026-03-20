from fastapi import FastAPI, Request, HTTPException
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

N8N_WEBHOOK_URL = os.getenv("N8N_WEBHOOK_URL")

@app.post("/api/submit")
async def submit_form(request: Request):
    if not N8N_WEBHOOK_URL:
        raise HTTPException(status_code=500, detail="N8N_WEBHOOK_URL not configured")
    
    try:
        data = await request.json()
        
        # Check for honeypot
        if data.get("confirm_email_address_verification"):
            print("Bot detection: Honeypot field filled")
            return {"message": "Success"} # Fake success for bots
        
        # Forward data to n8n
        response = requests.post(
            N8N_WEBHOOK_URL,
            json={
                "source": "VISCVLE Event Form (FastAPI)",
                "timestamp": requests.utils.quote(os.getenv("VERCEL_URL", "unknown")), # Just for tracking
                **data
            },
            timeout=10
        )
        
        if response.status_code >= 400:
            print(f"n8n error: {response.status_code} - {response.text}")
            raise HTTPException(status_code=502, detail="Error de comunicación con el servidor de reservas.")
            
        return {"message": "Success"}
        
    except Exception as e:
        print(f"Submission error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor. Por favor, intente más tarde.")

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
