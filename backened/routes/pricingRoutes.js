import express from "express";

import {
  fetchAllPricing,
  fetchPricingByCountry,
  calculatePricing,

} from "../controllers/pricingController.js";

const router = express.Router();



// Calculate pricing
router.post("/calculate", calculatePricing);

// Get all pricing
router.get("/", fetchAllPricing);

// Get pricing by country
router.get("/:country", fetchPricingByCountry);

export default router;