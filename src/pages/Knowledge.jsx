 import React from "react";
import button from "../assets/knowledge/button.webp";
import cremini from "../assets/knowledge/cremini.webp";
import enoki from "../assets/knowledge/enoki.webp";
import king from "../assets/knowledge/king.webp";
import milky from "../assets/knowledge/milky.webp";
import oyster from "../assets/knowledge/oyster.webp";
import protobelo from "../assets/knowledge/protobelo.webp";
import shitake from "../assets/knowledge/shitake.webp";

const mushrooms = [
  {
    id: 1,
    name: "Button Mushroom",
    image: button,
    taste: "Mild, soft",
    uses: "Soups, curries, pizzas, salads",
    health: "Rich in B vitamins, selenium, low-calorie",
    availability: "Cultivated, available all-year",
  },
  {
    id: 2,
    name: "Oyster Mushroom",
    image: oyster,
    taste: "Delicate, soft",
    uses: "Stir-fries, soups, as meat substitute",
    health: "High in protein, fiber, antioxidants",
    availability: "Cultivated, seasonal (All-year possible in controlled farms)",
  },
  {
    id: 3,
    name: "Shiitake Mushroom",
    image: shitake,
    taste: "Rich, umami flavor",
    uses: "Asian dishes, medicinal supplements",
    health: "Boosts immunity, contains lentinan",
    availability: "Cultivated, specialty stores",
  },
  {
    id: 4,
    name: "Milky Mushroom",
    image: milky,
    taste: "Soft, slightly sweet",
    uses: "Curries, stir-fries, local dishes",
    health: "High in protein, dietary fiber, vitamins",
    availability: "Cultivated in tropical areas, seasonal",
  },
  {
    id: 5,
    name: "King Oyster Mushroom",
    image: king,
    taste: "Meaty, firm",
    uses: "Gourmet dishes, soups, salads",
    health: "Rich in protein, low in fat",
    availability: "Cultivated, gourmet stores",
  },
  {
    id: 6,
    name: "Enoki Mushroom",
    image: enoki,
    taste: "Mild, crunchy",
    uses: "Soups, salads, sushi",
    health: "Antioxidants, supports digestion",
    availability: "Cultivated, specialty stores",
  },
  {
    id: 7,
    name: "Cremini Mushroom",
    image: cremini,
    taste: "Deeper flavor than button",
    uses: "Pastas, stews, curries",
    health: "Low calorie, rich in antioxidants",
    availability: "Cultivated, all-year",
  },
  {
    id: 8,
    name: "Portobello Mushroom",
    image: protobelo,
    taste: "Robust, meaty",
    uses: "Grilled, burgers, sandwiches",
    health: "Rich in nutrients and antioxidants",
    availability: "Cultivated, all-year",
  },
];

const Knowledge = () => {
  return (
    <div className="bg-[#fdfbe9] min-h-screen py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-900 mb-12 drop-shadow">
        Mushrooms in India
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mushrooms.map((mushroom) => (
          <div
            key={mushroom.id}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-green-200"
          >
            <img
              src={mushroom.image}
              alt={mushroom.name}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-green-800">{mushroom.name}</h2>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Taste:</span> {mushroom.taste}</p>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Uses:</span> {mushroom.uses}</p>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Health Benefits:</span> {mushroom.health}</p>
            <p className="text-gray-700"><span className="font-semibold">Availability:</span> {mushroom.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Knowledge;
