"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="bg-[#CC338B] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-white">

          
          <div>
            <h1 className="text-5xl font-bold text-white mb-6 hover:text-cyan-400 transition duration-300">
              Contact Us
            </h1>

            <p className="text-white text-lg leading-8 ">
              Ready to roll? Drop us a message and one of our account managers
              will reach out shortly to get your account set up and live in no
              time!
            </p>

            <p className="text-white text-lg leading-8 ">
              Prefer to explore on your own? Click here to check out our apps
              your way.
            </p>

            <div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-white">
                  support@ShereheSasa.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                <p className="text-white">
                  +254 745 119657
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                <p className="text-white leading-7">
                  Nairobi, Kenya
                  <br />
                  Sherehe Sasa Headquarters
                  <br />
                  123 Event Street,
                  <br />
                  7th Floor,
                  <br />
                  P.O. Box 348,
                  <br />
                  Nairobi, 00900,
                  <br />
                  Kenya
                </p>
              </div>

            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <form className="space-y-6">

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-lg"
              >
                Submit
              </button>

            </form>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}