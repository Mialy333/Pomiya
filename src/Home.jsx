import React, { useState, useEffect } from "react";
import AIChatCoach from "./AIChatCoach_HF_T5";
import WalletConnect from "./WalletConnect";
import Onboarding from "./components/Onboarding";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";

const quests = [
  { label: "Track 3 unnecessary expenses", path: "/quests/track-expenses" },
  {
    label: "Set a 3-day no-spend challenge",
    path: "/quests/no-spend-challenge",
  },
  {
    label: "Review one subscription service",
    path: "/quests/review-subscriptions",
  },
  { label: "Build your emergency fund", path: "/quests/emergency-fund" },
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

export default function Home() {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [xp, setXP] = useState(0);
  const [completed, setCompleted] = useState(Array(quests.length).fill(false));
  const [level, setLevel] = useState(1);
  const [levelUp, setLevelUp] = useState(false);
  const [image, setImage] = useState(getImageForLevel(1));

  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      const key = publicKey.toBase58();
      const storedXP = parseInt(localStorage.getItem(`xp-${key}`), 10);
      const storedCompleted = localStorage.getItem(`completed-${key}`);
      if (!isNaN(storedXP)) {
        setXP(storedXP);
      }
      if (storedCompleted) {
        setCompleted(JSON.parse(storedCompleted));
      }
    }
  }, [publicKey]);

  useEffect(() => {
    if (publicKey) {
      const key = publicKey.toBase58();
      localStorage.setItem(`xp-${key}`, xp);
      localStorage.setItem(`completed-${key}`, JSON.stringify(completed));
    }
  }, [xp, completed, publicKey]);

  useEffect(() => {
    const newLevel = getLevel(xp);
    if (newLevel !== level) {
      setLevel(newLevel);
      setImage(getImageForLevel(newLevel));
      setLevelUp(true);
      setTimeout(() => setLevelUp(false), 2000);
    }
  }, [xp]);

  const label = getLabelForLevel(level);

  if (showOnboarding) {
    return <Onboarding onFinish={() => setShowOnboarding(false)} />;
  }

  return (
    <WalletConnect>
      <div className="p-4 max-w-xl mx-auto text-center">
        {publicKey && (
          <div className="mb-3 text-sm text-gray-600">
            👛 Wallet connected:&nbsp;
            <span className="font-mono text-indigo-700">
              {publicKey.toBase58().slice(0, 4)}...
              {publicKey.toBase58().slice(-4)}
            </span>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-2">🎓 Welcome to Pomi</h1>
        <p className="text-lg mb-2 text-gray-600">
          Your Financial Pet Companion
        </p>
        <div className="mb-4 flex justify-center">
          <WalletMultiButton />
        </div>

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
              onClick={() => navigate(q.path)}
              className="block w-full p-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              {completed[i] ? "✅ " : ""}
              {q.label}
            </button>
          ))}
        </div>

        {publicKey && (
          <button
            onClick={() => {
              const key = publicKey.toBase58();
              localStorage.removeItem(`xp-${key}`);
              localStorage.removeItem(`completed-${key}`);
              setXP(0);
              setCompleted(Array(quests.length).fill(false));
            }}
            className="mt-6 text-sm text-red-600 hover:text-red-800 underline"
          >
            🔄 Reset progress
          </button>
        )}

        <AIChatCoach />
      </div>
    </WalletConnect>
  );
}
