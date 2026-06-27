"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

interface PricingData {
  id: number;
  country: string;
  currency: string;
  service_fee: number;
  marketplace_fee: number;
  bank_transfer_fee: number;
  mobile_money_fee: number;
  updated_at: string;
}

const countries = ["Kenya", "Uganda", "Tanzania", "Nigeria", "South Africa", "USA"];

export default function Pricing() {
  const [country, setCountry] = useState("Kenya");
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [calculation, setCalculation] = useState<{
    amount: number;
    platform_fee: number;
    organizer_payout: number;
  } | null>(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    async function fetchPricing() {
      setLoading(true);
      setErrorMessage("");

      try {
        const apiUrl = `http://localhost:5000/pricing/${encodeURIComponent(country)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load pricing.");
        }

        setPricing(data);
      } catch (error) {
        setPricing(null);
        setErrorMessage(
          error instanceof Error ? error.message : "Could not connect to the backend."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPricing();
  }, [country]);

  
  async function calculatePricing() {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    try {
      setCalculating(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pricing/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, amount: Number(amount) }),
    });


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Calculation failed.");
      }

      setCalculation(data);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Calculation failed");
    } finally {
      setCalculating(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="px-4 py-10">
        <section className="mx-auto max-w-4xl text-center">
          <p className="text-lg font-medium text-black sm:text-xl">
            Affordable Pricing. Unmatched Value.
            <br />
            Our pricing is simple and transparent.
            <br />
            We make money when you make money.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-lg font-semibold">
            <span>Pricing for</span>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-base"
            >
              {countries.map((countryName) => (
                <option key={countryName} value={countryName}>
                  {countryName}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg bg-gray-100 shadow-md">
          {loading && (
            <p className="p-8 text-center text-gray-600">Loading pricing...</p>
          )}

          {!loading && pricing && (
            <table className="w-full text-left bg-black text-white">
              <thead className="bg-gray-200">
                <tr>
                  {/* ✅ Removed invalid bare `bg-black` attribute */}
                  <th className="px-6 py-4 text-black">Fee Type</th>
                  <th className="px-6 py-4 text-black">Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-medium">Storefront Service Fee</td>
                  <td className="px-6 py-4">{pricing.service_fee}%</td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-medium">Marketplace Service Fee</td>
                  <td className="px-6 py-4">
                    {pricing.currency} {pricing.marketplace_fee}
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-medium">Bank Transfer Charges</td>
                  <td className="px-6 py-4">
                    {pricing.currency} {pricing.bank_transfer_fee}
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 font-medium">Mobile Money Transfer Charges</td>
                  <td className="px-6 py-4">
                    {pricing.currency} {pricing.mobile_money_fee}
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {!loading && !pricing && (
            <div className="p-8 text-center">
              <p className="font-medium text-red-500">Pricing data is not available.</p>
              <p className="mt-2 text-sm text-gray-600">{errorMessage}</p>
            </div>
          )}
        </section>

        {/* Calculator section moved outside the pricing table section */}
        <section className="mx-auto mt-10 max-w-4xl rounded-lg border bg-black p-8 shadow  text-white">
          <h2 className="mb-6 text-2xl font-bold text-center">Pricing </h2>

          <div className="space-y-4">
            <h1>If you Earn</h1>
            <input
              type="number"
             
              placeholder="enter the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded border px-4 py-3"
            />

            <button
              onClick={calculatePricing}
              disabled={calculating}
              className="rounded bg-green-600 px-6 py-3 text-black hover:bg-green-700"
            >
              {calculating ? "Calculating..." : "Calculate"}
            </button>

            {calculation && (
              <div className="mt-6 rounded-lg bg-blue-100 p-6 text-black shadow-md">
                <div className="flex justify-between py-2">
                  <span>Amount</span>
                  <span>
                     {calculation.amount}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span>Platform Fee</span>
                  <span>
                    {pricing?.currency} {calculation.platform_fee}
                  </span>
                </div>

                <div className="flex justify-between py-2 font-bold text-green-700">
                  <span>Organizer Payout</span>
                  <span>
                    {pricing?.currency} {calculation.organizer_payout}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}