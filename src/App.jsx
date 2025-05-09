import React, { useState } from "react";
import AIChatCoach from "./AIChatCoach";
import WalletConnect from "./WalletConnect";

const quests = [
  "Track 3 unnecessary expenses",
  "Set a 3-day no-spend challenge",
  "Review one subscription service",
];

const getLevel = (xp) => {
  if (xp >= 200)
    return { level: 3, label: "Money Master", image: "/level3.png" };
  if (xp >= 100)
    return { level: 2, label: "Budget Explorer", image: "/level2.png" };
  return { level: 1, label: "Newbie Saver", image: "/level1.png" };
};

export default function App() {
  const [xp, setXP] = useState(0);
  const [completed, setCompleted] = useState([]);

  const handleComplete = (index) => {
    if (!completed.includes(index)) {
      const newCompleted = [...completed, index];
      setCompleted(newCompleted);
      setXP((prevXP) => prevXP + 50);
    }
  };

  const { level, label, image } = getLevel(xp);

  return (
    <WalletConnect>
      <div className="p-4 max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-2">🎓 Welcome to Pomiya</h1>
        <p className="text-lg mb-2 text-gray-600">
          Your Financial Pet Companion
        </p>

        <div className="my-4">
          <p>
            Level <strong>{level}</strong>: {label}
          </p>
          <p className="text-sm text-gray-500">XP: {xp}</p>
        </div>

        <img
          src={image}
          alt="Pomiya"
          className="mx-auto w-40 rounded-xl border shadow"
        />

        <div className="mt-6 space-y-4">
          {quests.map((q, i) => (
            <button
              key={i}
              onClick={() => handleComplete(i)}
              disabled={completed.includes(i)}
              className={`block w-full p-3 rounded-xl text-white transition ${
                completed.includes(i)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {completed.includes(i) ? "✅ " : ""}
              {q}
            </button>
          ))}
        </div>

        <AIChatCoach />
      </div>
    </WalletConnect>
  );
}
