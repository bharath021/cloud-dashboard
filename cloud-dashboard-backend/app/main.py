# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

# Create FastAPI app
app = FastAPI()

# Add CORS middleware (very important for frontend to backend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (React frontend, localhost:3000 etc.)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the route for AWS Usage data
@app.get("/aws-usage")
def get_aws_usage():
    with open("aws_billing_data.json", "r") as file:
        aws_data = json.load(file)
    return {"aws_data": aws_data}
