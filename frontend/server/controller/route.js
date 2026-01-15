const Route = require("../models/route");
const Bus = require("../models/bus");
const Booking = require("../models/booking");

exports.getoneroute = async (req, res) => {
  try {
    let departure = req.params.departure;
    let arrival = req.params.arrival;
    let date = req.params.date;

    // 1️⃣ Find matching route
    let routes = await Route.find().lean().exec();

    let route = routes.find((route) => {
      return (
        route.departureLocation.name.toLowerCase() === departure.toLowerCase() &&
        route.arrivalLocation.name.toLowerCase() === arrival.toLowerCase()
      );
    });

    // 🔴 SAFETY CHECK — if route not found
    if (!route) {
      return res.status(404).json({
        message: "Route not found",
        matchedBuses: [],
        busidwithseatobj: {},
      });
    }

    // 2️⃣ Find buses for this route
    let buses = await Bus.find().lean().exec();

    let matchedBuses = buses.filter((bus) => {
      // 🔴 SAFETY CHECK — bus.routes may be undefined
      if (!bus.routes) return false;
      return bus.routes.toString() === route._id.toString();
    });

    // 3️⃣ Get booking data
    const bookings = await Booking.find().lean().exec();
    const busidwithseatobj = {};

    for (let i = 0; i < matchedBuses.length; i++) {
      let currentbusseats = [];

      const busbooking = bookings.filter((booking) => {
        return (
          booking.departureDetails.date === date &&
          booking.busId.toString() === matchedBuses[i]._id.toString()
        );
      });

      busbooking.forEach((booking) => {
        currentbusseats = [...currentbusseats, ...booking.seats];
      });

      busidwithseatobj[matchedBuses[i]._id.toString()] = currentbusseats;
    }

    // 4️⃣ Final response (frontend expects this exact shape)
    res.json({
      route: route,
      matchedBuses: matchedBuses,
      busidwithseatobj: busidwithseatobj,
    });

  } catch (error) {
    console.error("getoneroute error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
