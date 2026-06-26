<div align="center">

# 🏫 Campus GPS Navigation System

### Intelligent Campus Navigation with Graph-Based Routing & Turn-by-Turn Directions

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge\&logo=leaflet\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)

**A full-stack campus navigation platform that computes the shortest path between campus locations using graph algorithms, real GPS coordinates, compass bearings, and turn-by-turn navigation.**

</div>

---

# 📌 Overview

Campus GPS is a **full-stack web application** designed to help students, faculty, and visitors navigate university campuses efficiently.

Unlike a simple campus map, Campus GPS combines **graph theory**, **geospatial calculations**, and **interactive mapping** to generate realistic navigation routes between campus locations.

The project is built around a modular **Navigation Engine**, making it easy to extend with indoor navigation, QR positioning, voice guidance, and multi-campus support.

---

# ✨ Features

## 🗺️ Interactive Campus Map

* Fullscreen interactive campus map
* Built using Leaflet.js
* Smooth zoom & pan
* Auto-fit route to map bounds

---

## 🧭 Intelligent Navigation

* Dijkstra's Shortest Path Algorithm
* Real GPS distance calculations
* Compass bearing calculations
* Turn-by-turn navigation
* Walking time estimation
* Estimated arrival time
* Step-by-step directions

---

## 📍 Campus Data

* 22 mapped campus locations
* Gates
* Academic Buildings
* Laboratories
* Cafeterias
* Parking Areas
* Hostels
* Medical Center
* Sports Complex

---

## 🎨 Modern User Experience

* Map-first interface
* Responsive desktop layout
* Mobile-friendly bottom navigation panel
* Floating search interface
* Route summary panel
* Interactive map controls

---

## ⚙️ Backend Features

* REST API
* Modular Navigation Engine
* Thin Controller Architecture
* Structured API responses
* Feature-based organization

---

# 🏗️ Architecture

## Backend

```text
Client Request
      │
      ▼
Express Routes
      │
      ▼
Controllers
      │
      ▼
Navigation Engine
      │
      ├── Dijkstra Algorithm
      ├── Haversine Distance
      ├── Bearing Calculator
      ├── Direction Generator
      └── Walking Time Calculator
```

---

## Frontend

```text
React Application

features/
│
├── map/
├── search/
├── navigation/
├── freshers/
└── shared/
```

The frontend follows a **feature-based architecture**, allowing each product feature to own its UI, logic, and components.

---

# 🧠 Navigation Engine

The Navigation Engine is responsible for generating complete navigation information from raw campus graph data.

### Modules

### Dijkstra Algorithm

Finds the shortest route between two campus nodes.

---

### Haversine Formula

Calculates real-world GPS distances between coordinates.

---

### Bearing Calculator

Determines compass heading between locations.

Example:

```text
North

North-East

East

South-East
```

---

### Direction Generator

Converts angle changes into navigation instructions.

Examples

```text
Continue Straight

Slight Left

Turn Left

Sharp Left

Turn Right

Sharp Right
```

---

### Walking Time Calculator

Calculates:

* Walking Distance
* Estimated Walking Time
* Estimated Arrival Time

---

# 📊 Navigation Response

Example API response:

```json
{
  "summary": {
    "totalDistance": "1.86 km",
    "walkingTime": "23 min",
    "estimatedArrival": "11:37 PM",
    "stops": 7
  },
  "instructions": [
    {
      "stepNumber": 1,
      "location": {
        "id": "G1",
        "name": "Main Gate",
        "type": "gate"
      },
      "instruction": {
        "action": "start",
        "icon": "arrow-up-right",
        "text": "Head North-East",
        "severity": "none"
      },
      "distance": {
        "toNext": "120 m"
      },
      "bearing": 45,
      "compass": "North-East"
    }
  ]
}
```

---

# 🛠️ Tech Stack

| Layer              | Technology           |
| ------------------ | -------------------- |
| Backend            | Node.js + Express.js |
| Frontend           | React.js             |
| Map Rendering      | Leaflet.js           |
| HTTP Client        | Axios                |
| Routing Algorithm  | Dijkstra             |
| GPS Distance       | Haversine Formula    |
| Compass Navigation | Bearing Calculations |
| Styling            | CSS                  |
| Database           | MongoDB *(planned)*  |

---

# 📁 Project Structure

```text
campus-gps/

backend/
│
├── algorithms/
│   └── dijkstra.js
│
├── controllers/
│
├── routes/
│
├── models/
│
├── services/
│
├── utils/
│   ├── haversine.js
│   ├── bearing.js
│   ├── directions.js
│   ├── navigationEngine.js
│   └── walkingTime.js
│
└── app.js

frontend/
│
├── features/
│   ├── map/
│   ├── search/
│   ├── navigation/
│   └── freshers/
│
├── shared/
│
├── state/
│
├── services/
│
└── App.jsx
```

---

# 🔌 API Endpoints

## Health Check

```http
GET /
```

---

## Get All Locations

```http
GET /api/locations
```

---

## Get Location

```http
GET /api/locations/:id
```

---

## Get Route

```http
GET /api/path?from=G1&to=O5
```

Returns

* Shortest Path
* Walking Distance
* ETA
* Turn-by-turn Instructions
* Compass Directions

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/raghavendrashivam474/campus-gps.git
cd campus-gps
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm start
```

---

## Environment Variables

Create `.env`

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_connection_string
```

---

# 🎯 Design Philosophy

Campus GPS follows one core principle:

> **"The map is the product."**

Instead of behaving like a dashboard, the application is designed around the navigation experience, keeping the map as the primary interface while supporting it with lightweight search and route information.

---

# 🚀 Roadmap

## Sprint 3

* Landmark-based navigation
* MongoDB integration
* Backend deployment
* Frontend deployment
* Live demo
* Screenshots & GIF walkthrough

---

## Sprint 4

* QR Positioning
* Indoor Navigation
* Building Floor Maps
* Favorites
* Saved Routes

---

## Future Vision

* Multi-campus support
* Voice Navigation
* Mobile Application
* Indoor Positioning
* AR Navigation
* Campus Digital Twin

---

# 👨‍💻 Author

**Raghavendra Singh**

GitHub: https://github.com/raghavendrashivam474

---

# 📄 License

Licensed under the MIT License.

---

<div align="center">

### ⭐ If you found this project interesting, consider giving it a star!

**Built with ❤️ by Raghavendra Singh**

</div>
