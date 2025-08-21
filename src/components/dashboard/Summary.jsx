import React, { useState } from "react";

const Summary = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(import.meta.env.VITE_HF_API_KEY);
  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              import.meta.env.HF_API_KEY
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs:
              "Summarize all project details from my app.",
          }),
        }
      );

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setSummary(
        data[0]?.summary_text || "No summary generated."
      );
    } catch (err) {
      setSummary(`Error: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        AI Project Summary
      </h1>
      <button
        onClick={generateSummary}
        disabled={loading}
        className="px-4 py-2 bg-primary text-white rounded-lg">
        {loading ? "Generating..." : "Generate AI Summary"}
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-surface rounded shadow">
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summary;
