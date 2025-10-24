import { Routes, Route } from "react-router-dom";
import NavbarMain from "./components/NavbarMain";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute

// ✅ Pages
import Home from "./pages/Home";
import Mushrooms from "./pages/Mushrooms";
import Events from "./pages/Events";
import FarmerSupport from "./pages/FarmerSupport";
import Contact from "./pages/Contact";
import Knowledge from "./pages/Knowledge";
import Dashboard from "./pages/Dashboard"; // Import the Dashboard page

// --- NEW: Import Toaster ---
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-[#0f0425] min-h-screen flex flex-col font-inter">
      {/* --- NEW: Add Toaster component --- */}
      {/* This will make all toasts from AuthContext visible */}
      <Toaster position="top-center" reverseOrder={false} />

      <NavbarMain />
      <main className="flex-1 font-serif">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/mushrooms" element={<Mushrooms />} />
          <Route path="/events" element={<Events />} />
          <Route path="/farmer-support" element={<FarmerSupport />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/knowledge" element={<Knowledge />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ChatWidget />
      </main>
      <Footer />
    </div>
  );
}

export default App;
