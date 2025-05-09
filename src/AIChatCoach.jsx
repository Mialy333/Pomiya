import React, { useState } from "react";

const AIChatCoach = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    setResponse("Thinking...");
    try {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/facebook/blenderbot-3B",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: input }),
        }
      );
      const data = await res.json();
      setResponse(data.generated_text || "No response");
    } catch (error) {
      setResponse("Error contacting AI");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h3 className="font-bold mb-2">Ask your finance coach</h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="How can I improve my savings?"
        className="border rounded p-2 w-full mb-2"
      />
      <button
        onClick={askAI}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Ask
      </button>
      <p className="mt-2 text-sm">{response}</p>
    </div>
  );
};

export default AIChatCoach;
