export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
               Logo
            </h2>

            <p className="mt-4 text-sm leading-6 ">
              Your trusted partner for extraordinary events.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-white transition">
                LinkedIn
              </a>

              <a href="#" className="hover:text-white transition">
                Instagram
              </a>

              <a href="#" className="hover:text-white transition">
                X
              </a>

              <a href="#" className="hover:text-white transition">
                Facebook
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                📧 support@sherehesasa.com
              </li>

              <li>
                📞 Mobile (Kenya): (+254) 745 119 657
              </li>

              <li>
                🌍 Mobile (International): (+254)745 119 657
              </li>

              <li>
                💬 WhatsApp (Global): (+254) 745 119 657
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Company
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-white">
                  ShereheSasa
                </a>
              </li>

              <li>
                <a href="/events" className="hover:text-white">
                  Explore Events
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Learn More */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Learn More
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="/pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>

              <li>
                <a href="/blog" className="hover:text-white">
                  Blog
                </a>
              </li>

              <li>
                <a href="/terms" className="hover:text-white">
                  Terms of Use
                </a>
              </li>

              <li>
                <a href="/privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">

          <p>
            © {new Date().getFullYear()} ShereheSasa. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/terms" className="hover:text-white">
              Terms
            </a>

            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}