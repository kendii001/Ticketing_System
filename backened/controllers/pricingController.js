import {
  getAllPricing,
  getPricingByCountry,
  calculatePricingData,

} from "../models/pricingModel.js";

// GET /pricing
export const fetchAllPricing = async (req, res) => {
  try {
    const pricing = await getAllPricing();

    res.status(200).json(pricing);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch pricing.",
    });
  }
};

// GET /pricing/:country
export const fetchPricingByCountry = async (req, res) => {
  try {
    const { country } = req.params;

    const pricing = await getPricingByCountry(country);

    if (!pricing) {
      return res.status(404).json({
        message: `Pricing for ${country} not found.`,
      });
    }

    res.status(200).json(pricing);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};
export const calculatePricing = async (req, res) => {
  try {
    const { country, amount } = req.body;

    const calculation = await calculatePricingData(country, amount);

    if (!calculation) {
      return res.status(404).json({
        message: "Country not found.",
      });
    }

    res.status(200).json(calculation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });




  }
};