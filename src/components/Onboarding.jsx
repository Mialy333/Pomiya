import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Meet Pomiya!",
    text: "Your new financial companion. Cute, smart and here to help.",
    image: "/onboarding/slide5.png",
  },
  {
    title: "Set Your First Goal",
    text: "Want to save €30 this month? Start small and grow big!",
    image: "/onboarding/slide2.png",
  },
  {
    title: "Complete Quests",
    text: "Track habits, earn XP and level up your finance skills!",
    image: "/onboarding/slide3.png",
  },
  {
    title: "Customize Your Mood",
    text: "Choose your avatar’s mood to reflect your daily vibe.",
    image: "/onboarding/slide4.png",
  },
];

export default function Onboarding({ onFinish }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish(); // callback vers l'accueil
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <img
            src={slides[index].image}
            alt="slide"
            className="w-48 mx-auto mb-4 rounded-xl shadow-md"
          />
          <h2 className="text-2xl font-bold mb-2 text-indigo-700">
            {slides[index].title}
          </h2>
          <p className="text-gray-600 mb-6">{slides[index].text}</p>
          <button
            onClick={next}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition"
          >
            {index === slides.length - 1 ? "Let’s go!" : "Next"}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
