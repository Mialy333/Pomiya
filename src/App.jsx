import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import TrackExpenses from "./quests/TrackExpenses";
import NoSpendChallenge from "./quests/NoSpendChallenge";
import ReviewSubscriptions from "./quests/ReviewSubscriptions";
import EmergencyFund from "./quests/EmergencyFund";
import Onboarding from "./components/Onboarding";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(null); // null = loading

  useEffect(() => {
    const hasSeen = localStorage.getItem("seenOnboarding");
    setShowOnboarding(hasSeen !== "true"); // false si déjà vu
  }, []);

  const handleFinishOnboarding = () => {
    localStorage.setItem("seenOnboarding", "true");
    setShowOnboarding(false);
  };

  if (showOnboarding === null) return null; // évite clignotement ou blocage

  if (showOnboarding) {
    return <Onboarding onFinish={handleFinishOnboarding} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quests/track-expenses" element={<TrackExpenses />} />
      <Route path="/quests/no-spend-challenge" element={<NoSpendChallenge />} />
      <Route
        path="/quests/review-subscriptions"
        element={<ReviewSubscriptions />}
      />
      <Route path="/quests/emergency-fund" element={<EmergencyFund />} />
    </Routes>
  );
}
