import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Welcome!",
    text: "Start your journey with Pomi",
    image: "/onboarding/slide5.png",
  },
  {
    title: "Meet Pomi!",
    text: "Your new financial companion. Cute, smart and here to help.",
    image: "/onboarding/slide1.png",
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
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isStudent, setIsStudent] = useState(null);

  const nextSlide = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      setStep(1);
    }
  };

  const slidesDone = step > 0;

  const formSteps = [
    {
      title: "Who are you?",
      content: (
        <div className="space-y-4">
          <button
            onClick={() => {
              setIsStudent(true);
              setStep(step + 1);
            }}
            className="bg-indigo-600 text-white w-full p-3 rounded-xl"
          >
            🎓 I'm a student
          </button>
          <button
            onClick={() => {
              setIsStudent(false);
              setStep(step + 1);
            }}
            className="border border-indigo-600 text-indigo-600 w-full p-2 rounded-xl text-sm"
          >
            I'm not a student
          </button>
        </div>
      ),
    },
    {
      title: "What's your first name?",
      content: (
        <>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="w-full p-3 border rounded-xl"
          />
          <button
            onClick={() => setStep(step + 1)}
            disabled={!firstName}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl"
          >
            Next
          </button>
        </>
      ),
    },
    {
      title: "And your last name?",
      content: (
        <>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="w-full p-3 border rounded-xl"
          />
          <button
            onClick={() => setStep(step + 1)}
            disabled={!lastName}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl"
          >
            Next
          </button>
        </>
      ),
    },
    {
      title: "What's your email?",
      content: (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded-xl"
          />
          <button
            onClick={onFinish}
            disabled={!email}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl"
          >
            ✅ Let’s go!
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <AnimatePresence mode="wait">
        {slidesDone && formSteps[step - 1] ? (
          <motion.div
            key={`form-${step}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full"
          >
            <>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                {formSteps[step - 1].title}
              </h2>
              {formSteps[step - 1].content}
            </>
          </motion.div>
        ) : (
          <motion.div
            key={`slide-${index}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full"
          >
            <motion.img
              src={slides[index].image}
              alt="slide"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-48 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-indigo-700">
              {slides[index].title}
            </h2>
            <p className="text-gray-600 mb-6">{slides[index].text}</p>
            <button
              onClick={nextSlide}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition"
            >
              {index === slides.length - 1 ? "Next" : "Continue"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
