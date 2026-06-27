"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="bg-[#CC338B] py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Section */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 hover:text-cyan-400 transition duration-300">
              Contact Us
            </h1>

            <p className="text-base md:text-lg leading-7 md:leading-8 mb-4">
              Ready to roll? Drop us a message and one of our account managers
              will reach out shortly to get your account set up and live in no
              time!
            </p>

            <p className="text-base md:text-lg leading-7 md:leading-8 mb-8">
              Prefer to explore on your own? Click here to check out our apps
              your way.
            </p>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-white text-lg">Email</h3>
                <p className="text-gray-100 break-all">
                  support@ShereheSasa.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg">Phone</h3>
                <p className="text-gray-100">
                  +254 745 119657
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg">Office</h3>

                <p className="text-gray-100 leading-7">
                  Nairobi, Kenya <br />
                  Sherehe Sasa Headquarters <br />
                  123 Event Street <br />
                  7th Floor <br />
                  P.O. Box 348 <br />
                  Nairobi, 00900 <br />
                  Kenya
                </p>

              </div>

            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 w-full">

            <form className="space-y-5">

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#CC338B]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#CC338B]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm md:text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#CC338B]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#CC338B] hover:bg-[#b02d78] transition duration-300 text-white font-semibold py-3 rounded-lg"
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