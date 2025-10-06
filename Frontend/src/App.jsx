 import { Routes, Route } from "react-router-dom";
import NavbarMain from "./components/NavbarMain";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

// ✅ Pages
import Home from "./pages/Home";
import Mushrooms from "./pages/Mushrooms";
import Events from "./pages/Events";
import FarmerSupport from "./pages/FarmerSupport";
import Contact from "./pages/Contact";
import Knowledge from "./pages/Knowledge";

function App() {
  return (
    <div className="bg-[#0f0425] min-h-screen flex flex-col font-inter">
      <NavbarMain />
      <main className="flex-1 font-serif">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mushrooms" element={<Mushrooms />} />
          <Route path="/events" element={<Events />} />
          <Route path="/farmer-support" element={<FarmerSupport />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/knowledge" element={<Knowledge />} />
        </Routes>
        <ChatWidget />
      </main>
      <Footer />
    </div>
  );
}

export default App;
