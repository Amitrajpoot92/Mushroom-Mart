import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import {
  Sprout,
  ShoppingBasket,
  Calendar,
  BookOpen,
  Users,
  Phone,
  LogOut,
  ChevronDown,
  LockKeyhole, // <-- Naya icon add kiya hai
} from "lucide-react";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const NavbarMain = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState("login");

  // --- NEW: Profile dropdown ke liye state ---
  const [profileOpen, setProfileOpen] = useState(false);

  // --- UPDATED: Naya function import kiya ---
  const { user, logout, sendPasswordUpdateLink } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setProfileOpen(false); // Dropdown ko bhi band karein
  };

  const handleLoginClick = () => {
    setAuthType("login");
    setAuthOpen(true);
    closeMenu();
  };

  const handleSignupClick = () => {
    setAuthType("signup");
    setAuthOpen(true);
    closeMenu();
  };

  // --- UPDATED: Logout handler with confirmation ---
  const handleLogout = () => {
    // Confirmation pop-up (using simple browser confirm)
    // NOTE: `window.confirm` ka istemaal kiya hai, jaisa pehle tha.
    // Agar aap custom modal chahte hain, toh uske liye alag se state lagega.
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      closeMenu();
    }
  };

  // --- NEW: Update Password Handler ---
  const handleUpdatePassword = () => {
    // AuthContext mein toast pehle se hai.
    sendPasswordUpdateLink();
    closeMenu();
  };

  return (
    <>
      <header
        className="flex justify-between items-center px-4 sm:px-8 py-4 sticky top-0 z-50 w-full text-gray-900 backdrop-blur-sm bg-[#fdfbe9]/90"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-medium tracking-wider uppercase"
        >
          UrbanFungi
        </Link>

        {/* Hamburger (mobile) */}
        <div className="flex md:hidden cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        {/* Nav Links */}
        <nav
          className={`${
            menuOpen
              ? "flex flex-col items-center gap-4 py-4 absolute top-full left-0 right-0 bg-[#fdfbe9] md:hidden backdrop-blur-md shadow-lg"
              : "hidden md:flex items-center gap-6 lg:gap-8"
          }`}
        >
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors ${
                isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            Home
          </NavLink>

          {/* --- FIX: Link ko "/mushrooms" kar diya --- */}
          <NavLink
            to="/mushrooms"
            onClick={closeMenu}
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors ${
                isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            Mushrooms
          </NavLink>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="uppercase text-sm tracking-wide text-gray-900 hover:text-[#95e500] flex items-center">
              Services
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 mt-2 bg-[#fdfbe9] shadow-lg rounded-md py-2 w-56 md:w-64 transition-all duration-300 transform ${
                servicesOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              <Link
                to="/farmer-support"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Sprout size={18} /> Cultivation Support
              </Link>
              <Link
                to="/mushrooms"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <ShoppingBasket size={18} /> Buy Fresh Mushrooms
              </Link>
              <Link
                to="/events"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Calendar size={18} /> Community Events
              </Link>
              <Link
                to="/knowledge"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <BookOpen size={18} /> Knowledge Hub
              </Link>
              <Link
                to="/community"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Users size={18} /> Farmer Community
              </Link>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Phone size={18} /> Contact Us
              </Link>
            </div>
          </div>

          <NavLink
            to="/farmer-support"
            onClick={closeMenu}
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors ${
                isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            Support
          </NavLink>

          {/* --- UPDATED Auth Section --- */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {user ? (
              // --- Logged-in User View ---
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-gray-900 px-4 py-2 rounded font-semibold text-sm hover:text-[#95e500] transition"
                >
                  {/* User ka naam, ya email, ya "Profile" fallback */}
                  Hi,{" "}
                  {user.displayName
                    ? user.displayName.split(" ")[0]
                    : user.email
                    ? user.email.split("@")[0]
                    : "User"}
                  <ChevronDown
                    size={16}
                    className={`${
                      profileOpen ? "rotate-180" : ""
                    } transition-transform`}
                  />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-[#fdfbe9] shadow-lg rounded-md py-2 w-48 text-gray-900">
                    {/* --- NEW: Update Password Button --- */}
                    <button
                      onClick={handleUpdatePassword}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold hover:bg-gray-200"
                    >
                      <LockKeyhole size={16} /> Update Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-200"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // --- Logged-out User View ---
              <>
                <button
                  onClick={handleLoginClick}
                  className="text-gray-900 px-4 py-2 rounded font-semibold text-sm hover:text-[#95e500] transition"
                >
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  className="bg-[#f3cc00] text-gray-900 px-4 py-2 rounded font-semibold text-sm hover:bg-[#95e500] transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Auth Modal */}
      <AuthModal
        type={authType}
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
};

export default NavbarMain;
