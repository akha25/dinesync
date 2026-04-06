# DINESYNC (PRO+) - Restaurant Table & Order Management System

Welcome to the DINESYNC repository - an elegant, fully-featured, MERN stack application built for modern restaurant table and order management.

## Tech Stack
* **Frontend**: React (Vite) + Vanilla CSS (Dynamic styling with vibrant aesthetics, animations, and modern UI/UX). No Tailwind used.
* **Backend**: Node.js + Express
* **Database**: MongoDB (via Mongoose)

## Features Included
1. **Interactive Live Floor Map**: Grid layout categorizing tables with vivid color statuses (Available = Green, Occupied = Red, Dirty = Yellow).
2. **Order & Billing Engine**: Real-time total calculation. Food (5% GST), Beverages (18% GST). Accurate 10% Service Charge attached automatically.
3. **Table Transfer Logic**: Seamless transfer of an active tab from an occupied table to an available one.
4. **Checkout & Locking**: Single button to checkout which locks the table and updates the status to 'Dirty'.
5. **Dashboard Analytics**: Top level insights on Live Revenue, Real-time Occupancy, Peak Floors, and Pending Cleanups.
6. **Robust Validation**: Rejection of negative pricing, protection against deleting active tables, and collision detection for transfers.

## Run Locally

### 1. Database Setup
Ensure you have MongoDB running locally at `mongodb://127.0.0.1:27017` or use the provided `.env` to configure your connection string.

### 2. Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173/` inside your browser.

## Database Export (Assignment Requirement)
To fulfill the requirement to export the database context:
```bash
cd backend
npm run db:export
```
This script will directly contact your MongoDB connection and export the raw collections into `db_dump.json` at the root folder.
