import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const expenses = [
  { id: 1, label: "Netflix Subscription", unnecessary: true, img: "/cards/netflix.png" },
  { id: 2, label: "Groceries", unnecessary: false, img: "/cards/groceries.png" },
  { id: 3, label: "Coffee to go", unnecessary: true, img: "/cards/coffee.png" },
  { id: 4, label: "Phone bill", unnecessary: false, img: "/cards/phone.png" },
  { id: 5, label: "Impulse Buy: Shoes", unnecessary: true, img: "/cards/shoes.png" },
];

export default function TrackExpenses() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  const handleSwipe = (direction) => {
    const current = expenses[index];
    const correct =
      (direction === "left" && current.unnecessary) ||
      (direction === "right" && !current.unnecessary);
    if (correct) setScore((s) => s + 1);

    if (index === expenses.length - 1) {
      setFinished(true);
      // mettre ici une logique XP backend si besoin
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-indigo-50 flex flex-col items-center justify-center text-center">
      {!finished ? (
        <>
          <h1 className="text-xl font-semibold mb-2">
            Swipe left for unnecessary 💸, right for essential 💼
          </h1>
          <AnimatePresence mode="wait">
            <motion.div
              key={expenses[index].id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) handleSwipe("left");
                if (info.offset.x > 100) handleSwipe("right");
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-4 w-72 h-96 flex flex-col items-center justify-center cursor-grab"
            >
              <img
                src={expenses[index].img}
                alt={expenses[index].label}
                className="w-32 h-32 object-contain mb-4"
              />
              <p className="text-lg font-medium">{expenses[index].label}</p>
            </motion.div>
          </AnimatePresence>
          <p className="mt-4 text-sm text-gray-500">
            Card {index + 1} of {expenses.length}
          </p>
        </>
      ) : (
        <div className="text-center">
          <img
            src="/level3.png"
            alt="Happy Pomiya"
            className="w-40 mx-auto mb-4 animate-bounce"
          />
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            🎉 Great job!
          </h2>
          <p className="text-gray-700 mb-4">
            You spotted {score} unnecessary expenses.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl"
          >
            🔙 Return to Home
          </button>
        </div>
      )}
    </div>
  );
}