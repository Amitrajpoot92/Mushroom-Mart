 import {
  Twitter,
  Linkedin,
  Mail,
  Instagram,
  Home,
  ShoppingBasket,
  Calendar,
  Sprout,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-[#fdfbe9] text-gray-900 w-full mt-16"
      style={{ fontFamily: "Orbitron, sans-serif" }}
    >
      {/* Top Section */}
      <div className="w-full max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand & Mission */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#95e500] via-[#f3cc00] to-white bg-clip-text text-transparent">
            UrbanFungi
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            🍄 Fresh, organic, and exotic mushrooms delivered with care.
            Supporting farmers and bringing nature’s goodness to your plate.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#95e500]">Explore</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="/"
                className="flex items-center gap-2 hover:text-[#f3cc00] transition-colors"
              >
                <Home size={16} className="text-[#95e500]" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="/mushrooms"
                className="flex items-center gap-2 hover:text-[#f3cc00] transition-colors"
              >
                <ShoppingBasket size={16} className="text-[#f3cc00]" />
                <span>Mushrooms</span>
              </a>
            </li>
            <li>
              <a
                href="/events"
                className="flex items-center gap-2 hover:text-[#95e500] transition-colors"
              >
                <Calendar size={16} className="text-[#95e500]" />
                <span>Events</span>
              </a>
            </li>
            <li>
              <a
                href="/farmer-support"
                className="flex items-center gap-2 hover:text-[#f3cc00] transition-colors"
              >
                <Sprout size={16} className="text-[#95e500]" />
                <span>Farmer Support</span>
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="flex items-center gap-2 hover:text-[#f3cc00] transition-colors"
              >
                <Phone size={16} className="text-[#f3cc00]" />
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#95e500]">
            Get in Touch
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-[#95e500]" />
              <a
                href="mailto:info@UrbanFungi.com"
                className="hover:text-[#f3cc00] transition-colors"
              >
                info@Urbanfungi.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={18} className="text-[#95e500]" />
              <a
                href="https://twitter.com/Urbanfungi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f3cc00] transition-colors"
              >
                @Urbanfungi
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={18} className="text-[#95e500]" />
              <a
                href="https://linkedin.com/company/Urbanfungi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f3cc00] transition-colors"
              >
                UrbanFungi
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={18} className="text-[#95e500]" />
              <a
                href="https://instagram.com/Urbanfungi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f3cc00] transition-colors"
              >
                @UrbanFungi
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-300"></div>

      {/* Bottom Section */}
      <div className="w-full text-center text-gray-600 text-sm py-6">
        &copy; {new Date().getFullYear()} UrbanFungi. All rights reserved.
      </div>
    </footer>
  );
}
