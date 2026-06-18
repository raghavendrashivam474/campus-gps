# 🏫 Campus GPS Navigation System

A web-based Campus GPS that finds the **shortest path** between
any two locations on campus using **Dijkstra's Algorithm**
with real GPS coordinates.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Frontend | React.js |
| Map | Leaflet.js |
| Algorithm | Dijkstra + Haversine |
| Database | MongoDB (coming soon) |

---

## 📁 Project Structure
campus-gps/
├── backend/ → Node.js REST API
└── frontend/ → React.js Web App

text


---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/campus-gps.git
cd campus-gps
2. Setup Backend
Bash

cd backend
npm install
npm run dev
3. Setup Frontend
Bash

cd frontend
npm install
npm start
🔌 API Endpoints
text

GET /api/locations            → All campus locations
GET /api/locations/:id        → Single location
GET /api/path?from=G1&to=O5  → Shortest path
🗺️ Campus Locations
text

Gates      → 2  (Main Gate, Back Gate)
Buildings  → 8  (Admin, Library, CS, ECE...)
Cafeteria  → 2  (Main Cafeteria, Mini Canteen)
Labs       → 3  (Physics, Chemistry, Computer)
Parking    → 2  (Main, Staff)
Other      → 5  (Sports, Auditorium, Medical, Hostels)
Total      → 22 Locations
👨‍💻 Developer
Built by Raghavendra

 ✅ STEP 4 — Create Backend .env.example

This helps other developers know what variables they need.

Go to backend folder:

```powershell
cd backend
new-item .env.example
Add:

env

PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/campus-gps
✅ STEP 5 — Verify package.json Scripts
Open backend/package.json and make sure scripts look like:

JSON

"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js",
  "seed": "node src/utils/seeder.js"
}