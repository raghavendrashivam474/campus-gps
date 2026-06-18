const express = require("express");
const router = express.Router();

const locationRoutes = require("./locationRoutes");
const pathRoutes = require("./pathRoutes");

router.get("/", (req, res) => {
  res.json({ message: "Campus GPS API Working ✅" });
});

router.use("/api/locations", locationRoutes);
router.use("/api/path", pathRoutes);

module.exports = router;