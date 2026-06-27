import Image from 'next/image';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Blog() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">

          {/* Image */}
          <Image src="/media/image4.jpeg" alt="Blog Image" className="w-full h-300px object-cover rounded-lg shadow-md"
          width={800}
  height={500}
  />

          {/* Right Side Content */}
          <div className="flex flex-col gap-6">

            {/* Paragraph (top right) */}
            <p>
              In todays fast-moving digital world, organizing and attending
              events should not feel complicated. Whether its a concert,
              campus event, conference, or cultural celebration, people want one
              thing: quick and reliable ticket access. Thats exactly what the
              Sherehe Sasa Ticketing System is designed to solve.
             
              <br /><br />
              
              Sherehe Sasa is a modern web-based ticketing system built to
              simplify how events are created, managed, and attended. It
              connects event organizers and attendees through a seamless
              platform where tickets can be discovered, purchased, and
              validated in real time.
            </p>

            {/* List (below text) */}
            <div>
              <h3 className="font-semibold mb-2">The Problem It Solves</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                <li>Long queues at entry points</li>
                <li>Manual ticket verification</li>
                <li>Poor event visibility</li>
                <li>Lack of centralized event listings</li>
              </ul>
                       
            </div>

          </div>
        </div>
           <h2 className="text-2xl font-bold mb-10">Benefits</h2>

          <p>
            The platform reduces fraud, shortens entry queues, improves event
            visibility, and gives organizers complete control over ticket sales
            and attendee management.
          </p>

          <p>
            Whether youre hosting a music concert, conference, sports event,
            university function, or festival, Sherehe Sasa simplifies the entire
            ticketing process from event creation to attendee check-in.
          </p>
      </div>

      <Footer />
    </>
  );
}