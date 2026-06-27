import pool from "../db.js";

// Get all pricing
export const getAllPricing = async () => {
  const result = await pool.query(
    "SELECT * FROM country_pricing ORDER BY country ASC"
  );

  return result.rows;
};

// Get pricing by country
export const getPricingByCountry = async (country) => {
  const result = await pool.query(
    `
    SELECT *
    FROM country_pricing
    WHERE LOWER(country) = LOWER($1)
    `,
    [country]
  );

  return result.rows[0];
};
// Calculate pricing
export const calculatePricingData = async (country, amount) => {
  const result = await pool.query(
    `
    SELECT service_fee
    FROM country_pricing
    WHERE LOWER(country) = LOWER($1)
    `,
    [country]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const serviceFee = Number(result.rows[0].service_fee);

  const platformFee = (Number(amount) * serviceFee) / 100;
  const organizerAmount = Number(amount) - platformFee;

  return {
  amount: Number(amount),
  platform_fee: platformFee,
  organizer_payout: organizerAmount,
};
};