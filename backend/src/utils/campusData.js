// src/utils/campusData.js

const campusData = [
  // ─── GATES ───────────────────────────────────────
  {
    id: "G1",
    name: "Main Gate",
    type: "gate",
    lat: 17.4401,
    lng: 78.4982,
    connectedTo: ["B1", "B2", "P1"]
  },
  {
    id: "G2",
    name: "Back Gate",
    type: "gate",
    lat: 17.4451,
    lng: 78.4902,
    connectedTo: ["B6", "P2"]
  },

  // ─── BUILDINGS ───────────────────────────────────
  {
    id: "B1",
    name: "Admin Block",
    type: "building",
    lat: 17.4411,
    lng: 78.4972,
    connectedTo: ["G1", "B2", "B3"]
  },
  {
    id: "B2",
    name: "Library",
    type: "building",
    lat: 17.4421,
    lng: 78.4992,
    connectedTo: ["G1", "B1", "B4"]
  },
  {
    id: "B3",
    name: "Computer Science Block",
    type: "building",
    lat: 17.4431,
    lng: 78.4962,
    connectedTo: ["B1", "B4", "B5"]
  },
  {
    id: "B4",
    name: "Electronics Block",
    type: "building",
    lat: 17.4441,
    lng: 78.4982,
    connectedTo: ["B2", "B3", "B5", "B6"]
  },
  {
    id: "B5",
    name: "Mechanical Block",
    type: "building",
    lat: 17.4451,
    lng: 78.4972,
    connectedTo: ["B3", "B4", "B7"]
  },
  {
    id: "B6",
    name: "Civil Block",
    type: "building",
    lat: 17.4461,
    lng: 78.4952,
    connectedTo: ["G2", "B4", "B7"]
  },
  {
    id: "B7",
    name: "MBA Block",
    type: "building",
    lat: 17.4471,
    lng: 78.4932,
    connectedTo: ["B5", "B6", "B8"]
  },
  {
    id: "B8",
    name: "Science Block",
    type: "building",
    lat: 17.4481,
    lng: 78.4912,
    connectedTo: ["B7", "C1"]
  },

  // ─── CAFETERIA ───────────────────────────────────
  {
    id: "C1",
    name: "Main Cafeteria",
    type: "cafeteria",
    lat: 17.4436,
    lng: 78.4942,
    connectedTo: ["B5", "B8", "C2", "P1"]
  },
  {
    id: "C2",
    name: "Mini Canteen",
    type: "cafeteria",
    lat: 17.4426,
    lng: 78.4932,
    connectedTo: ["C1", "B3"]
  },

  // ─── LABS ────────────────────────────────────────
  {
    id: "L1",
    name: "Physics Lab",
    type: "lab",
    lat: 17.4416,
    lng: 78.4952,
    connectedTo: ["B1", "L2"]
  },
  {
    id: "L2",
    name: "Chemistry Lab",
    type: "lab",
    lat: 17.4406,
    lng: 78.4962,
    connectedTo: ["L1", "B2"]
  },
  {
    id: "L3",
    name: "Computer Lab",
    type: "lab",
    lat: 17.4446,
    lng: 78.4972,
    connectedTo: ["B3", "B4"]
  },

  // ─── PARKING ─────────────────────────────────────
  {
    id: "P1",
    name: "Main Parking",
    type: "parking",
    lat: 17.4396,
    lng: 78.4972,
    connectedTo: ["G1", "C1"]
  },
  {
    id: "P2",
    name: "Staff Parking",
    type: "parking",
    lat: 17.4456,
    lng: 78.4892,
    connectedTo: ["G2"]
  },

  // ─── OTHER ───────────────────────────────────────
  {
    id: "O1",
    name: "Sports Ground",
    type: "other",
    lat: 17.4466,
    lng: 78.4962,
    connectedTo: ["B6", "B7"]
  },
  {
    id: "O2",
    name: "Auditorium",
    type: "other",
    lat: 17.4476,
    lng: 78.4942,
    connectedTo: ["B7", "B8"]
  },
  {
    id: "O3",
    name: "Medical Center",
    type: "other",
    lat: 17.4486,
    lng: 78.4922,
    connectedTo: ["B8", "O2"]
  },
  {
    id: "O4",
    name: "Boys Hostel",
    type: "other",
    lat: 17.4496,
    lng: 78.4902,
    connectedTo: ["O3", "G2"]
  },
  {
    id: "O5",
    name: "Girls Hostel",
    type: "other",
    lat: 17.4506,
    lng: 78.4882,
    connectedTo: ["O4", "G2"]
  }
];

module.exports = campusData;