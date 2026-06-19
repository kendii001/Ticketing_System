import Footer from "@/components/footer";
import Image from "next/image";
export default function Help() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-20 p-4 sm:p-6 lg:p-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Help Center
        </h1>

        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 text-green-400 text-base sm:text-lg font-semibold">
          <li>Sherehe Sasa</li>
          <li>Knowledge Base</li>
          <li>FAQs</li>
        </ul>
      </div>

      {/* MAIN SECTION */}
      <div className="bg-green-100 rounded-lg shadow-md p-4 sm:p-6 lg:p-10 xl:p-20 m-4 sm:m-6 lg:m-10">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">

          {/* TEXT */}
          <div className="flex-1">
            <p className="text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-700">
              Welcome to Sherehe Sasa support page. We’re thrilled to have you here.
              This is your go-to place for assistance, tips, and resources to help
              you on your journey. Whether you have questions or need support,
              our team is here to help you succeed.
              <br />
              <br />
              Lets Hustle together!
            </p>
          </div>

          {/* IMAGE */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/media/image1.jpeg"
              alt="Help Image"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover rounded-lg shadow-md"
            />
          </div>

        </div>

        {/* SEARCH INPUT */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Ask a question..."
            className="w-full max-w-md border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* SUPPORT SECTION */}
      <div className="bg-green-50 rounded-lg shadow-md p-4 sm:p-6 lg:p-10 xl:p-20 m-4 sm:m-6 lg:m-10 text-center">
        <p className="text-sm sm:text-base lg:text-lg text-gray-700">
          Did not find any solutions? Talk to our world class customer support agents.
          They are always available and ready to help.
        </p>
      </div>

      <Footer />
    </div>
  );
}