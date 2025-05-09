import React, { useState, useEffect } from "react";
import AIChatCoach from "./AIChatCoach";
import WalletConnect from "./WalletConnect";

const quests = [
  "Track 3 unnecessary expenses",
  "Set a 3-day no-spend challenge",
  "Review one subscription service",
  "Build your emergency fund",
];

const getLevel = (xp) => {
  if (xp >= 200) return 4;
  if (xp >= 150) return 3;
  if (xp >= 100) return 2;
  return 1;
};

const getImageForLevel = (level) => `/level${level}.png`;

const getLabelForLevel = (level) => {
  switch (level) {
    case 1:
      return "Newbie Saver";
    case 2:
      return "Budget Explorer";
    case 3:
      return "Money Master";
    case 4:
      return "Crypto Guardian";
    default:
      return "";
  }
};

export default function App() {
  const [xp, setXP] = useState(0);
  const [completed, setCompleted] = useState(Array(quests.length).fill(false));
  const [level, setLevel] = useState(1);
  const [levelUp, setLevelUp] = useState(false);
  const [image, setImage] = useState(getImageForLevel(1));

  useEffect(() => {
    const newLevel = getLevel(xp);
    if (newLevel !== level) {
      setLevel(newLevel);
      setImage(getImageForLevel(newLevel));
      setLevelUp(true);
      setTimeout(() => setLevelUp(false), 2000); // reset après 2s
    }
  }, [xp]);

  const handleComplete = (index) => {
    if (!completed[index]) {
      const updated = [...completed];
      updated[index] = true;
      setCompleted(updated);
      setXP((prevXP) => prevXP + 50);
    }
  };

  const label = getLabelForLevel(level);

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

        {levelUp && (
          <div className="text-yellow-500 text-lg font-bold mb-2 animate-bounce">
            🎉 Level Up! You've reached Level {level}
          </div>
        )}

        <div
          className={`transition-all duration-700 ease-in-out ${
            levelUp ? "scale-110" : "scale-100"
          }`}
        >
          <img
            src={image}
            alt={`Pomiya level ${level}`}
            className="mx-auto w-40 sm:w-52 rounded-xl border shadow-lg"
          />
        </div>

        <div className="mt-6 space-y-4">
          {quests.map((q, i) => (
            <button
              key={i}
              onClick={() => handleComplete(i)}
              disabled={completed[i]}
              className={`block w-full p-3 rounded-xl text-white transition ${
                completed[i]
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {completed[i] ? "✅ " : ""}
              {q}
            </button>
          ))}
        </div>

        <AIChatCoach />
      </div>
    </WalletConnect>
  );
}
