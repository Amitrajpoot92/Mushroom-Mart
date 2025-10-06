 import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ArrowRight, X } from "lucide-react";

// --- IMAGE IMPORTS ---
import heroImage from "../assets/hero.webp";
import patnaEventImg from "../assets/mushrooms/Img1.png";
import delhiEventImg from "../assets/mushrooms/Img2.png";
import mumbaiEventImg from "../assets/mushrooms/Img3.png";

// Dummy gallery images
import img1 from "../assets/mushrooms/Img1.png";
import img2 from "../assets/mushrooms/Img2.png";
import img3 from "../assets/mushrooms/Img3.png";
import img4 from "../assets/mushrooms/Img4.png";
import img5 from "../assets/mushrooms/Img5.png";
import img6 from "../assets/mushrooms/Img6.png";

// --- MOCK DATA FOR EVENTS ---
const eventsData = [
  {
    id: 1,
    status: "upcoming",
    name: "Patna Mushroom Fair 2025",
    location: "Gyan Bhawan, Patna, Bihar",
    date: "October 25-26, 2025",
    description:
      "Join us for the largest mushroom fair in Bihar! Discover rare species, attend cultivation seminars by leading experts, and taste gourmet mushroom dishes from local chefs. A perfect weekend for fungi enthusiasts and families alike.",
    image: patnaEventImg,
    featured: true,
    gallery: [img1, img2, img3, img4, img5, img6],
  },
  {
    id: 2,
    status: "upcoming",
    name: "Monsoon Mushroom Foraging Trip",
    location: "Lonavala, Maharashtra",
    date: "November 15, 2025",
    description:
      "Embark on a guided foraging adventure in the lush hills of Lonavala. Learn to identify wild, edible mushrooms with our expert mycologists. Limited spots available.",
    image: null,
    gallery: [],
  },
  {
    id: 3,
    status: "past",
    name: "Gourmet Mushroom Festival",
    location: "Jio World Centre, Mumbai",
    date: "August 2025",
    description:
      "Our Mumbai festival was a massive success, celebrating the culinary versatility of mushrooms with live cooking demos and tasting stalls from top city chefs. It was a feast for the senses!",
    image: mumbaiEventImg,
    gallery: [img1, img2, img3, img4, img5, img6],
  },
  {
    id: 4,
    status: "past",
    name: "Mushroom Cultivation Workshop",
    location: "India Habitat Centre, New Delhi",
    date: "June 2025",
    description:
      "We hosted a sold-out, hands-on workshop in Delhi where attendees learned the A-Z of setting up their own home mushroom farms, from substrate preparation to harvesting.",
    image: delhiEventImg,
    gallery: [img4, img5, img6, img1, img2, img3],
  },
];

// --- HERO SECTION ---
const HeroSection = () => (
  <motion.div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
    <motion.img
      src={heroImage}
      alt="Mushroom Events Banner"
      className="absolute inset-0 w-full h-full object-cover blur-sm"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2 }}
    />
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 text-center px-4">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        MushroomMart Events
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-green-400 mt-2 drop-shadow"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        Join our fungi community and celebrate the magic of mushrooms.
      </motion.p>
    </div>
  </motion.div>
);

// --- EVENT MODAL ---
const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-[#fdfbe9] rounded-2xl border border-green-500/30 w-full max-w-5xl h-full max-h-[90vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto p-4 md:p-6 bg-white rounded-l-2xl">
            <div className="grid grid-cols-1 gap-4">
              {event.gallery.map((imgSrc, index) => (
                <motion.img
                  key={index}
                  src={imgSrc}
                  alt={`${event.name} gallery ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              ))}
            </div>
          </div>
          <div className="relative flex flex-col p-8 bg-slate-900/80 rounded-r-2xl text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X size={28} />
            </button>
            <h2 className="text-4xl font-extrabold mb-4">{event.name}</h2>
            <div className="flex items-center gap-4 text-green-400 mb-2">
              <Calendar size={20} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-4 text-green-400 mb-6">
              <MapPin size={20} />
              <span>{event.location}</span>
            </div>
            <div className="border-t border-green-500/20 pt-6">
              <p className="text-gray-100 leading-relaxed">{event.description}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- EVENTS PAGE ---
export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const upcomingEvents = eventsData.filter((e) => e.status === "upcoming");
  const pastEvents = eventsData.filter((e) => e.status === "past");
  const featuredEvent = upcomingEvents.find((e) => e.featured);
  const otherUpcomingEvents = upcomingEvents.filter((e) => !e.featured);

  return (
    <div className="bg-[#fdfbe9] min-h-screen font-sans text-gray-900">
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <HeroSection />

      <main className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-24">
        {/* Upcoming Events */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-green-900 mb-8 border-l-4 border-green-500 pl-4">
            Upcoming Events
          </h2>
          {featuredEvent && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-2xl overflow-hidden border border-green-500/20 shadow-lg mb-12 bg-white">
              <div className="lg:col-span-3">
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.name}
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
              <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredEvent.name}
                </h3>
                <div className="flex items-center gap-4 text-green-700 mb-2">
                  <Calendar size={20} />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-4 text-green-700 mb-4">
                  <MapPin size={20} />
                  <span>{featuredEvent.location}</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {featuredEvent.description}
                </p>
                <button className="flex items-center justify-center gap-2 w-full md:w-auto bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 self-start">
                  Register Now <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}
          {otherUpcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl mb-4 border border-green-500/20 shadow-sm"
            >
              <div>
                <h4 className="text-xl font-bold text-gray-900">{event.name}</h4>
                <div className="flex items-center gap-4 text-green-700 mt-1 text-sm">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
              </div>
              <button
                className="mt-4 md:mt-0 text-green-900 font-semibold hover:text-green-600 transition-colors flex items-center gap-2"
                onClick={() => setSelectedEvent(event)}
              >
                View Details <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </motion.section>

        {/* Past Events Gallery */}
        <motion.section
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-green-900 mb-8 border-l-4 border-green-500 pl-4">
            Past Event Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg"
                onClick={() => setSelectedEvent(event)}
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{event.name}</h3>
                  <p className="text-green-400 flex items-center gap-2 mt-1">
                    <MapPin size={16} /> {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
