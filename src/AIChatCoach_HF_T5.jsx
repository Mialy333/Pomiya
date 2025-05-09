import React, { useState } from "react";

export default function AIChatCoach() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-base",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `Instruction: You are a kind financial coach for students. ${input}`,
          }),
        }
      );

      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType.includes("application/json")) {
        throw new Error("API returned invalid response format");
      }

      const data = await res.json();
      console.log("HF T5 response:", data);
      const answer = data?.[0]?.generated_text || "Sorry, no response.";
      setResponse(answer);
    } catch (error) {
      console.error("HF T5 Error:", error);
      setResponse("Error contacting the finance coach.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 text-left">
      <h2 className="text-xl font-semibold mb-2">Ask Your Finance Coach 🎓</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something like: How can I save more money?"
        className="w-full p-2 border border-gray-300 rounded mb-2"
        rows={3}
      />
      <button
        onClick={askAI}
        disabled={loading || input.length < 3}
        className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {response && (
        <div className="mt-4 p-3 bg-green-50 text-green-900 border border-green-300 rounded-xl shadow animate-fadeIn">
          <div className="flex items-start space-x-2">
            <span className="text-2xl">💬</span>
            <p>
              <strong>Coach:</strong> {response}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
