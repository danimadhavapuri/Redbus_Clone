const express = require("express");
const router = express.Router();
const Bus = require("../models/bus");

/*
  GET buses by departure & arrival
  URL:
  /api/bus/routes/:departure/:arrival/:date
*/

router.get("/routes/:departure/:arrival/:date", async (req, res) => {
  try {
    const { departure, arrival } = req.params;

    // 1️⃣ Get all buses with populated routes
    const buses = await Bus.find().populate("routes");

    // 2️⃣ Filter buses based on route locations
    const matchedBuses = buses.filter((bus) => {
      return (
        bus.routes &&
        bus.routes.departureLocation?.name === departure &&
        bus.routes.arrivalLocation?.name === arrival
      );
    });

    // 3️⃣ Build seat object (frontend expects this)
    const busidwithseatobj = {};
    matchedBuses.forEach((bus) => {
      busidwithseatobj[bus._id] = [];
    });

    // 4️⃣ Send response EXACTLY as frontend expects
    res.status(200).json({
      matchedBuses,
      route: matchedBuses.length > 0 ? matchedBuses[0].routes : null,
      busidwithseatobj,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
