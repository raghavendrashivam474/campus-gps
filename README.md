<div align="center">

# 🏫 Campus GPS Navigation System

### Find the shortest path between any two locations on campus

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

</div>

---

## 📌 Overview

**Campus GPS** is a full-stack web application that helps students and staff navigate a university campus by finding the **shortest path** between any two locations.

It uses **Dijkstra's Algorithm** for pathfinding and the **Haversine Formula** to calculate real GPS distances in meters between campus nodes.

---

## 🖼️ Screenshots

> Map with shortest path drawn between two locations

---

## ✨ Features

- 🗺️ **Interactive Map** — Built with Leaflet.js
- 📍 **22 Campus Locations** — Gates, Buildings, Labs, Cafeterias, Parking, Hostels
- 🔍 **Shortest Path** — Dijkstra's Algorithm with real GPS weights
- 📏 **Real Distances** — Haversine Formula (accurate to meters)
- 🎨 **Color Coded Pins** — Different colors per location type
- 🔄 **Swap Button** — Instantly swap From/To locations
- 👣 **Step by Step Navigation** — Full path breakdown
- ⚡ **Fast API** — REST API with Express.js

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Backend | Node.js + Express.js | REST API Server |
| Frontend | React.js | UI Framework |
| Map | Leaflet.js + React-Leaflet | Interactive Map |
| HTTP | Axios | API calls |
| Algorithm | Dijkstra's Algorithm | Shortest Path |
| Formula | Haversine Formula | GPS Distance |
| Database | MongoDB (coming soon) | Data Storage |

---

## 🧠 How It Works
Campus locations are stored as nodes in a graph
Each node has lat/lng coordinates and connections
Haversine formula calculates real distance between nodes
Dijkstra's algorithm finds the shortest path
Path is drawn on the map as a dashed blue line
text


---

## 🗺️ Campus Locations (22 Total)
🚪 Gates → 2 Main Gate, Back Gate
🏫 Buildings → 8 Admin, Library, CS, ECE, Mech, Civil, MBA, Science
🍽️ Cafeteria → 2 Main Cafeteria, Mini Canteen
🔬 Labs → 3 Physics, Chemistry, Computer
🚗 Parking → 2 Main Parking, Staff Parking
🏟️ Other → 5 Sports Ground, Auditorium, Medical Center, Hostels

text


---

## 🔌 API Endpoints
GET / → Health check
GET /api/locations → Get all 22 locations
GET /api/locations/:id → Get single location by ID
GET /api/path?from=G1&to=O5 → Get shortest path between two locations

text


### Sample Response

```json
{
  "success": true,
  "from": "Main Gate",
  "to": "Girls Hostel",
  "totalDistance": "1858.51 meters",
  "steps": 6,
  "path": [
    { "id": "G1", "name": "Main Gate", "type": "gate" },
    { "id": "P1", "name": "Main Parking", "type": "parking" },
    { "id": "C1", "name": "Main Cafeteria", "type": "cafeteria" },
    { "id": "B8", "name": "Science Block", "type": "building" },
    { "id": "O3", "name": "Medical Center", "type": "other" },
    { "id": "O4", "name": "Boys Hostel", "type": "other" },
    { "id": "O5", "name": "Girls Hostel", "type": "other" }
  ]
}
📁 Project Structure
text

campus-gps/
├── backend/
│   └── src/
│       ├── algorithms/
│       │   └── dijkstra.js        # Dijkstra's shortest path
│       ├── controllers/
│       │   ├── locationController.js
│       │   └── pathController.js
│       ├── database/
│       │   └── db.js              # MongoDB connection
│       ├── models/
│       │   └── Location.js        # Mongoose schema
│       ├── routes/
│       │   ├── index.js
│       │   ├── locationRoutes.js
│       │   └── pathRoutes.js
│       ├── utils/
│       │   ├── buildGraph.js      # Graph builder
│       │   ├── campusData.js      # Campus location data
│       │   ├── haversine.js       # GPS distance formula
│       │   └── seeder.js          # DB seeder
│       └── app.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── CampusMap.js       # Leaflet map component
        │   └── MapLegend.js       # Map legend
        ├── services/
        │   └── api.js             # Axios API calls
        ├── App.js
        └── App.css
🚀 Getting Started
Prerequisites
text

Node.js v18+
npm v9+
1. Clone the Repository
Bash

git clone https://github.com/raghavendrashivam474/campus-gps.git
cd campus-gps
2. Setup Backend
Bash

cd backend
npm install
Create .env file:

env

PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
Run backend:

Bash

npm run dev
3. Setup Frontend
Bash

cd frontend
npm install
npm start
4. Open in Browser
text

http://localhost:3000
🗺️ Usage
Open the app in your browser
Select a Starting Location from the dropdown
Select a Destination from the dropdown
Click "Find Shortest Path"
View the path drawn on the map
Follow the step by step directions
🚧 Upcoming Features
text

⏳ Walking time estimate
⏳ Search bar for locations
⏳ Mobile responsive design
⏳ MongoDB database integration
⏳ Deployment (Railway + Vercel)
👨‍💻 Author
Raghavendrashivam

GitHub: @raghavendrashivam474
📄 License
This project is open source and available under the MIT License.

<div align="center"> Built with ❤️ by Raghavendra </div> ```