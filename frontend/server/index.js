const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(bodyparser.json());

/* ---------- ROUTES ---------- */
const customerRoutes = require("./routes/customer");
const routeRoutes = require("./routes/route");
const bookingRoutes = require("./routes/booking");
const busRoutes = require("./routes/bus"); 
app.use("/api/customer", customerRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/bus", busRoutes); 

/* ---------- DATABASE ---------- */
const DBURL =
  "mongodb+srv://redbus_user:redbus_pass123@redbus.koe7zh1.mongodb.net/redbus?retryWrites=true&w=majority&appName=Redbus"
mongoose
  .connect(DBURL)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error("Mongodb connection error:", err));

/* ---------- TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("Redbus backend working");
});

/* ---------- SERVER ---------- */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});