# Frontend Dashboard
🌐 Cloud Cost Dashboard (AWS Billing Tracker)

A full-stack web app to visualize AWS usage costs with FastAPI backend and React frontend.
It supports Dark Mode, Search, Pie Chart, Bar Chart, Monthly Breakdown — everything!

Simple React dashboard to display AWS usage data from FastAPI backend.

📊 AWS Usage Dashboard

This project is a React + FastAPI full-stack web application that visualizes AWS usage and billing data through an interactive dashboard.

It includes:
	•	🌗 Dark Mode toggle
	•	📅 Month Selector (March 2024 → March 2025)
	•	🔎 Search bar for services
	•	💳 Total AWS Spend card
	•	📋 Service Cost Table
	•	📊 Pie Chart of service costs
	•	📊 Bar Chart of service costs
	•	📈 Monthly Spend Breakdown Table

    #Project Structure
  cloud-dashboard/
├── cloud-dashboard-backend/
│   ├── app/
│   │   └── main.py
│   ├── aws_billing_data.json
│   ├── requirements.txt
│   └── README.md
│
├── frontend-dashboard/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md

      ⚙️Setup Instructions
      1. Backend Setup (FastAPI)
      bash
      # Step into backend folder
cd cloud-dashboard-backend

# Install Python packages
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --reload
      	•	Backend server will run at:
➔ http://127.0.0.1:8000
	•	Test API endpoint:
➔ http://127.0.0.1:8000/aws-usage

2. Frontend Setup (React)
bash
cd ~/Desktop/cloud-dashboard-backend/frontend-dashboard
# Step into frontend folder
cd frontend-dashboard

# Install Node.js packages
npm install

# Start React app
npm start
	•	Frontend server will run at:
     ➔ http://localhost:3000

     📦 Requirements
	•	Node.js (v18 or v20)
	•	Python 3.10+ (with fastapi, uvicorn)
	•	React.js (with chart.js and react-chartjs-2)

Install backend libraries if missing:
bash
pip install fastapi uvicorn
Install frontend libraries if missing:
bash
npm install chart.js react-chartjs-2 

✨ Features
Feature	:-        Description
Dark Mode Toggle:-	Switch between Light and Dark UI themes
Month Filter:-	Select month (March 2024 → March 2025)
Search AWS Services:- Instantly filter service names
Total AWS Spend Card:-	Shows total monthly spend
Service Cost Table:-	List of services, regions, costs
Pie Chart:-	Visual breakdown by service costs
Bar Chart:-	Comparison between service costs
Monthly Spend Table:-	Total AWS spend per month

📦 Frontend Main Libraries
	•	React.js
	•	Chart.js
	•	React-Chartjs-2
	📄 Sample API Response
	When you open http://127.0.0.1:8000/aws-usage, backend returns:
	{
  "aws_data": [
    {
      "service": "Amazon EC2",
      "region": "us-east-1",
      "month": "March 2025",
      "cost_usd": 85.50
    },
    {
      "service": "Amazon S3",
      "region": "us-east-1",
      "month": "March 2025",
      "cost_usd": 22.75
    }
  ]
}

👨‍💻 Developed by Bharath Karumanchi ❤️