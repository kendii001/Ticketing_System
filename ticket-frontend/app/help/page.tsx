
import Footer from "@/components/footer";

export default function Help() {
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-20 p-8">
        <h1 className="text-4xl font-bold">Help Center</h1>

        <ul className="flex flex-row gap-10 list-none text-green-400 text-lg font-semibold">
          <li>Sherehe Sasa</li>
          <li>Knowledge Base</li>
          <li>FAQs</li>
        </ul>
      </div>

      <div className="bg-green-100 rounded-lg shadow-md p-20 m-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text */}
          <div className="flex-1">
            <p className="text-lg leading-8 text-gray-700">
              Welcome to Sherehe Sasa support page.
              We’re thrilled to have you here.
              This is your go-to place for assistance, tips, and resources to
              help you on your journey. Whether you have questions or need
              support, our team is here to help you succeed.
              <br />
              <br />
              Let’s Hustle together!
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center">
  <img
    src="/media/image1.jpeg"
    alt="Help Image"
    className="w-64 md:w-80 h-auto object-cover rounded-lg shadow-md"
  />
</div>
        </div>

        {/* Search Input */}
        <div className="mt-8 flex justify-right ">
          <input
            type="text"
            placeholder="Ask a question..."
            className="w-full max-w-md border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div className="bg-green-50 rounded-lg shadow-md p-20 m-10">
        <p>Did not find any solutions?
Talk to our world class customer support agents. They are always available and ready to help.</p>
      </div>

      <Footer />
    </>
  );
}

