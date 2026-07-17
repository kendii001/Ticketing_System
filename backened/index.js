import express from "express";
import cors from "cors";

import "./db.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import pendingRoutes from "./routes/pendingRoutes.js";
import eventRoutes from "./routes/eventsRoutes.js";
import adminRoutes from "./routes/admin.js";
const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.199:3000",
    ],
  })
);

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Ticketing API is running 🚀",
  });
});
app.use("/api", eventRoutes);
app.use("/api", adminRoutes);

app.use("/api", pendingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api", eventRoutes);

// Pricing Routes
app.use("/pricing", pricingRoutes);

// Start Server
app.listen(port, "0.0.0.0", () => {
  console.log(` Backend running at http://localhost:${port}`);
  console.log(` Network: http://192.168.1.199:${port}`);
});