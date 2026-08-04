import express from "express";
import cors from "cors";

import "./db.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import pendingRoutes from "./routes/pendingRoutes.js";
import eventRoutes from "./routes/eventsRoutes.js";
import adminRoutes from "./routes/admin.js";

const app = express();
const port = process.env.PORT || 5000;

// Allowed Production Domains
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://127.0.0.1:3000",
  "https://ticketing-system.vercel.app",
  "https://www.ticketing-system.vercel.app",
];

// Flexible CORS Configuration (Supports local LAN IPs & Vercel Previews)
const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g., Postman, cURL, server-to-server)
    if (!origin) return callback(null, true);

    // Allow explicitly listed production/local domains
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow local network IP testing (e.g., http://192.168.1.199:3000 or http://10.0.0.x)
    const isLocalNetwork = /^http:\/\/(192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}):3000$/.test(origin);
    
    // Allow Vercel preview deployments (*.vercel.app)
    const isVercelPreview = /^https:\/\/.*\.vercel\.app$/.test(origin);

    if (isLocalNetwork || isVercelPreview) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS middleware globally (handles all GET, POST, OPTIONS, etc. automatically)
app.use(cors(corsOptions));

// Body Parsing Middleware
app.use(express.json());

// Base Health Check Route
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Ticketing API is running ",
  });
});

// Mounted API Routes
app.use("/api/events", eventRoutes);    // Endpoints: GET/POST /api/events, GET /api/events/:id
app.use("/api/admin", adminRoutes);     // Endpoints: /api/admin/*
app.use("/api/pending", pendingRoutes); // Endpoints: /api/pending/*
app.use("/api/contact", contactRoutes); // Endpoints: /api/contact/*
app.use("/api/pricing", pricingRoutes); // Endpoints: /api/pricing/*

// Handle 404 for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start Server
app.listen(port, "0.0.0.0", () => {
  console.log(`Backend running at http://localhost:${port}`);
});

export default app;