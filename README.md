# Amazon Clone Fullstack Project

This is a fullstack Amazon clone project with React frontend, Node.js + Express backend, PostgreSQL database, and Razorpay payment integration.

---

## Setup Instructions

### Backend

1. Copy the example environment file:

```bash
cp backend/config/config.env.example backend/config/config.env

2 - Open backend/config/config.env and fill in your own credentials:


PORT=3000
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432

3 - Install backend dependencies:

cd backend
npm install


4 - Start the backend server:

npm start




Frontend

1 - Install frontend dependencies:

cd frontend
npm install



2 - Start the frontend server:

npm start