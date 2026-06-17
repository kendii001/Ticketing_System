import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
export default function About() {
  return (
    <div>
      <Navbar/>
     
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 items-center">

      {/* Left Side */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          We as Sherehe Sasa are dedicated to:
        </h1>
      </div>

      {/* Right Side */}
      <div>
        <p className="text-gray-600 leading-relaxed">
          Providing the best event management solutions for our customers.
          Our platform is designed to simplify the event planning process,
          allowing organizers to create, manage, and promote their events with ease.
          Our team is passionate about creating seamless experiences for event
          organizers and attendees alike.
        </p>
      </div>

<GoogleAnalytics />

<div className="flex justify-center">
  <img
    src="/media/image2.jpeg"
    alt="About Us Image"
    className="w-250 h-100 object-cover rounded-lg shadow-md"
  />
</div>
    </div>
    <div className="flex flex-col items-center justify-center bg-gray-100 py-10 px-6 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Our Mission</h1>
      <p className="text-gray-600 leading-relaxed">
        Our mission is to empower event organizers with a comprehensive <br></br>
         platform that simplifies the event planning process, enhances attendee engagement, <br></br>
         and drives successful events. We aim to be the go-to solution for event management,<br></br>
          providing tools and resources that enable our customers to create unforgettable experiences.
      </p>
    </div>
  <div className="bg-green-300 py-6 px-8">
  
  {/* Title on top */}
  <h1 className="text-2xl font-bold text-gray-800 mb-4">
    Our Core Values
  </h1>

  {/* Navbar-style list below */}
  <ul className="flex flex-row gap-10 list-none text-gray-700 font-medium">
    <li className="hover:text-gray-900 cursor-pointer">Customer-Centricity</li>
    <li className="hover:text-gray-900 cursor-pointer">Innovation</li>
    <li className="hover:text-gray-900 cursor-pointer">Integrity</li>
    <li className="hover:text-gray-900 cursor-pointer">Collaboration</li>
    <li className="hover:text-gray-900 cursor-pointer">Excellence</li>
  </ul>

</div>
    
<Footer/>
    </div>
  );
}