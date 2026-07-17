"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage("✅ Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
      } else {
        setErrorMessage(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="bg-[#CC338B] py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Section */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>

            <p className="text-base md:text-lg leading-7 mb-4">
              Ready to roll? Drop us a message and one of our account managers
              will reach out shortly to get your account set up.
            </p>

            <p className="text-base md:text-lg leading-7 mb-8">
              Prefer to explore on your own? Check out our apps.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p>support@sherehesasa.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p>+254 745 119657</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Office</h3>
                <p>
                  Nairobi, Kenya
                  <br />
                  Sherehe Sasa Headquarters
                  <br />
                  123 Event Street
                  <br />
                  7th Floor
                  <br />
                  P.O. Box 348
                  <br />
                  Nairobi 00900
                  <br />
                  Kenya
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CC338B]"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CC338B]"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#CC338B]"
                  required
                />
              </div>

              {successMessage && (
                <div className="rounded-lg bg-green-100 border border-green-400 text-green-700 px-4 py-3">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="rounded-lg bg-red-100 border border-red-400 text-red-700 px-4 py-3">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#CC338B] hover:bg-[#b02d78] transition duration-300 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}