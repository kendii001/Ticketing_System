import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function About() {
  return (
    <div className="w-full overflow-x-hidden bg-cyan-50">
      <Navbar />

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 px-4 sm:px-6 lg:px-10 py-10 items-center">
                <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                          We as Sherehe Sasa are dedicated to:
                        </h1>
                </div>

                    <div>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                          Providing the best event management solutions for our customers.
                          Our platform is designed to simplify the event planning process,
                          allowing organizers to create, manage, and promote their events
                          with ease. Our team is passionate about creating seamless
                          experiences for event organizers and attendees alike.
                        </p>
                    </div>
      </div>

      <GoogleAnalytics />

      {/* MAIN IMAGE */}
                  <div className="flex justify-center px-4 sm:px-6 lg:px-10">
                    <Image
                      src="/media/image2.jpeg"
                      alt="About Us Image"
                      width={1200}
                      height={800}
                      className="w-full max-w-3xl h-auto object-cover rounded-lg shadow-md"
                    />
                  </div>

                        {/* MISSION */}
                        <div className="flex flex-col items-center justify-center bg-gray-100 py-10 px-4 sm:px-6 text-center mt-10">
                                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                                    Our Mission
                                  </h1>

                                  <p className="text-gray-600 leading-relaxed max-w-3xl mt-3 text-sm sm:text-base">
                                    Our mission is to empower event organizers with a comprehensive
                                    platform that simplifies the event planning process, enhances
                                    attendee engagement, and drives successful events.
                                  </p>
                        </div>

                              {/* CORE VALUES */}
                              <div className="bg-green-300 py-6 px-4 sm:px-6 lg:px-10 mt-10">
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                                      Our Core Values
                                    </h1>

                                    <ul className="flex flex-wrap gap-4 sm:gap-6 lg:gap-10 text-gray-700 font-medium">
                                      <li className="hover:text-gray-900 cursor-pointer">
                                        Customer-Centricity
                                      </li>
                                      <li className="hover:text-gray-900 cursor-pointer">Innovation</li>
                                      <li className="hover:text-gray-900 cursor-pointer">Integrity</li>
                                      <li className="hover:text-gray-900 cursor-pointer">Collaboration</li>
                                      <li className="hover:text-gray-900 cursor-pointer">Excellence</li>
                                    </ul>
                              </div>

      {/* MARQUEE SECTION (FIXED) */}
      <div className="w-full overflow-hidden py-8">
        <div className="flex gap-4 sm:gap-6 animate-marquee-infinite hover:[animation-play-state:paused] w-max">
          {[
            "/media/image2.jpeg",
            "/media/image1.jpeg",
            "/media/image1.jpeg",
            "/media/image.jpeg",
            "/media/image3.jpeg",
            "/media/image2.jpeg",
            "/media/image1.jpeg",
            "/media/image.jpeg",
            "/media/image3.jpeg",
          ].map((img, i) => (
            <div
              key={i}
              className="relative w-40 sm:w-52 md:w-60 aspect-square rounded-lg overflow-hidden shadow-md flex-shrink-0"
            >
              <Image
                src={img}
                alt={`event-${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}