import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Zap,
  Star,
  Quote,
  User,
  Plus,
  Minus,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

// --- IMAGE IMPORTS from knowledge folder ---
import heroImage from "../assets/hero.webp";
import button from "../assets/knowledge/button.webp";
import oyster from "../assets/knowledge/oyster.webp";
import shitake from "../assets/knowledge/shitake.webp";
import milky from "../assets/knowledge/milky.webp";
import king from "../assets/knowledge/king.webp";
import enoki from "../assets/knowledge/enoki.webp";
import cremini from "../assets/knowledge/cremini.webp";
import protobelo from "../assets/knowledge/protobelo.webp";

// --- MOCK DATA with slugs (for scrolling) ---
const mushroomData = [
  {
    id: 1,
    slug: "button",
    name: "Button Mushroom",
    image: button,
    category: "Culinary",
    price: 12.99,
    fullDescription:
      "Mild flavor, commonly used in soups, curries, pizzas, and salads. Rich in B vitamins, selenium, and low-calorie.",
  },
  {
    id: 2,
    slug: "oyster",
    name: "Oyster Mushroom",
    image: oyster,
    category: "Gourmet",
    price: 10.5,
    fullDescription:
      "Delicate taste, often used in stir-fries, soups, and as a meat substitute. High in protein and antioxidants.",
  },
  {
    id: 3,
    slug: "shiitake",
    name: "Shiitake Mushroom",
    image: shitake,
    category: "Medicinal",
    price: 18.0,
    fullDescription:
      "Rich, umami flavor. Used in Asian dishes and supplements. Boosts immunity and has medicinal compounds.",
  },
  {
    id: 4,
    slug: "milky",
    name: "Milky Mushroom",
    image: milky,
    category: "Culinary",
    price: 8.75,
    fullDescription:
      "Soft texture with a slightly sweet taste. Popular in Indian curries and stir-fries. High in dietary fiber and vitamins.",
  },
  {
    id: 5,
    slug: "king",
    name: "King Oyster Mushroom",
    image: king,
    category: "Gourmet",
    price: 15.0,
    fullDescription:
      "Meaty, firm texture. Great for grilling, soups, and gourmet dishes. Rich in protein, low in fat.",
  },
  {
    id: 6,
    slug: "enoki",
    name: "Enoki Mushroom",
    image: enoki,
    category: "Culinary",
    price: 14.0,
    fullDescription:
      "Mild, crunchy mushrooms used in soups, salads, and sushi. Contains antioxidants and supports digestion.",
  },
  {
    id: 7,
    slug: "cremini",
    name: "Cremini Mushroom",
    image: cremini,
    category: "Culinary",
    price: 9.0,
    fullDescription:
      "Deeper flavor than button mushrooms. Used in pastas, stews, and curries. Rich in antioxidants.",
  },
  {
    id: 8,
    slug: "portobello",
    name: "Portobello Mushroom",
    image: protobelo,
    category: "Gourmet",
    price: 20.0,
    fullDescription:
      "Large, meaty mushrooms. Perfect for grilling as burgers or stuffing. Rich in nutrients.",
  },
];

const testimonialData = [
  {
    id: 1,
    name: "Sarah L.",
    stars: 5,
    quote:
      "The freshest shiitake I've ever had. Made my stir-fry incredible and the delivery was so fast!",
  },
  {
    id: 2,
    name: "Mike R.",
    stars: 5,
    quote:
      "I tried the Lion's Mane for its health benefits, and I'm amazed. The quality is top-notch.",
  },
  {
    id: 3,
    name: "Jessica Chen",
    stars: 5,
    quote:
      "MushroomMart is my go-to for gourmet mushrooms. The Chanterelles were perfect for my risotto.",
  },
];

// --- HERO SECTION ---
const HeroSection = () => (
  <motion.div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
    <motion.img
      src={heroImage}
      alt="Exotic Mushrooms Banner"
      className="absolute inset-0 w-full h-full object-cover blur-sm"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2 }}
    />
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="relative z-10 text-center px-4">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Discover Nature's Finest Fungi
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-white mt-2 drop-shadow"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        Fresh, Organic, and Delivered to Your Door
      </motion.p>
    </div>
  </motion.div>
);

// --- MUSHROOM CAROUSEL ---
const MushroomCarousel = ({ mushrooms, onImageClick }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000 })]
  );
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {mushrooms.map((mushroom) => (
            <motion.div
              className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 pl-4 cursor-pointer"
              key={mushroom.id}
              onClick={() => onImageClick(mushroom.slug)}
            >
              <div className="group relative bg-white rounded-xl p-6 border border-green-300/30 text-center transition-shadow duration-300 shadow-[0_0_15px_rgba(74,222,128,0)] hover:shadow-[0_0_25px_rgba(74,222,128,0.5)]">
                <img
                  src={mushroom.image}
                  alt={mushroom.name}
                  className="w-full h-48 object-cover rounded-lg"
                  loading="lazy"
                />
                <h3 className="text-2xl font-bold text-gray-900 mt-4">
                  {mushroom.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-0 md:-left-4 transform -translate-y-1/2 bg-white/70 text-gray-900 p-2 rounded-full hover:bg-green-500 hover:text-white transition-colors z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-0 md:-right-4 transform -translate-y-1/2 bg-white/70 text-gray-900 p-2 rounded-full hover:bg-green-500 hover:text-white transition-colors z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

// --- QUANTITY SELECTOR ---
const QuantitySelector = ({ mushroomName }) => {
  const [quantity, setQuantity] = useState(1);
  const handleAddToCartClick = () => {
    toast.success(`${quantity} x ${mushroomName} added to cart!`, {
      style: { background: "#e6f1dd", color: "#065f46" },
      iconTheme: { primary: "#22c55e", secondary: "#065f46" },
    });
  };
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
      <div className="flex items-center gap-2 bg-green-50 rounded-full p-1">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center text-lg font-bold text-gray-900">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <button
        onClick={handleAddToCartClick}
        className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
      >
        <ShoppingCart size={20} /> Add to Cart
      </button>
      <button className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-gray-400 transition-all duration-300 transform hover:scale-105">
        <Zap size={20} /> Buy Now
      </button>
    </div>
  );
};

// --- PRODUCT LIST SECTION ---
const ProductListSection = ({ mushrooms, productRefs }) => (
  <div className="w-full max-w-7xl mx-auto py-16 px-4 space-y-24">
    {mushrooms.map((mushroom, index) => (
      <div
        key={mushroom.id}
        id={mushroom.slug}
        ref={productRefs[mushroom.slug]}
        className={`grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12`}
      >
        <motion.div
          className={`relative group ${index % 2 !== 0 ? "md:order-last" : ""}`}
          initial={{ opacity: 0, x: index % 2 !== 0 ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full max-w-sm mx-auto aspect-square">
            <div className="absolute -inset-4 bg-green-200/40 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src={mushroom.image}
              alt={mushroom.name}
              className="relative w-full h-full object-cover rounded-full shadow-2xl shadow-gray-400/50"
            />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: index % 2 !== 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            {mushroom.name}
          </h2>
          <p className="text-3xl font-bold text-green-600 mb-5">
            ${mushroom.price.toFixed(2)}
          </p>
          <p className="text-gray-800 leading-relaxed">
            {mushroom.fullDescription}
          </p>
          <QuantitySelector mushroomName={mushroom.name} />
        </motion.div>
      </div>
    ))}
  </div>
);

// --- TESTIMONIALS SECTION ---
const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <div className="bg-green-50 py-16">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonialData.map((testimonial) => (
                <div
                  className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 pl-4"
                  key={testimonial.id}
                >
                  <div className="relative h-full bg-white p-8 rounded-xl border border-green-200/50 flex flex-col justify-between shadow-md">
                    <Quote
                      className="absolute top-4 right-4 text-green-200/50"
                      size={64}
                    />
                    <div className="z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                          <User className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold">
                            {testimonial.name}
                          </p>
                          <div className="flex text-yellow-500">
                            {[...Array(testimonial.stars)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/70 text-gray-900 p-2 rounded-full hover:bg-green-500 hover:text-white transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/70 text-gray-900 p-2 rounded-full hover:bg-green-500 hover:text-white transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function MushroomsPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Culinary", "Gourmet", "Medicinal"];
  const filteredMushrooms =
    filter === "All"
      ? mushroomData
      : mushroomData.filter((m) => m.category === filter);

  // refs for product scroll
  const productRefs = mushroomData.reduce((acc, mushroom) => {
    acc[mushroom.slug] = useRef(null);
    return acc;
  }, {});

  const handleImageClick = (slug) => {
    productRefs[slug].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ✅ Auto scroll when page loads with hash
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = productRefs[id]?.current;
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [location, productRefs]);

  return (
    <div className="bg-[#fdfbe9] min-h-screen text-gray-900 font-sans">
      <Toaster position="top-center" />
      <HeroSection />
      <main>
        <motion.div
          className="w-full max-w-7xl mx-auto py-16 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Our Signature Collection
          </h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            From earthy Shiitake to delicate Oyster, explore nature's gourmet
            treasures cultivated with care.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  filter === cat
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-gray-800 hover:bg-green-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <MushroomCarousel
            mushrooms={filteredMushrooms}
            onImageClick={handleImageClick}
          />
        </motion.div>

        <ProductListSection
          mushrooms={filteredMushrooms}
          productRefs={productRefs}
        />
        <TestimonialsSection />
      </main>
    </div>
  );
}
