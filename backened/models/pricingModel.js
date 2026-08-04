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
    SELECT country, currency, service_fee, marketplace_fee, bank_transfer_fee, mobile_money_fee
    FROM country_pricing
    WHERE LOWER(country) = LOWER($1)
    `,
    [country]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const pricing = result.rows[0];
  const serviceFee = Number(pricing.service_fee);
  const amountValue = Number(amount);

  const platformFee = (amountValue * serviceFee) / 100;
  const organizerAmount = amountValue - platformFee;

  return {
    amount: amountValue,
    platform_fee: platformFee,
    organizer_payout: organizerAmount,
    currency: pricing.currency,
  };
};