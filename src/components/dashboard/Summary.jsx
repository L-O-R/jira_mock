import React, { useState } from "react";

const Summary = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const getProjectsAndTasks = () => {
    const projects =
      JSON.parse(localStorage.getItem("projectData")) || [];
    const users =
      JSON.parse(localStorage.getItem("userData")) || [];

    const findUser = (id) =>
      users.find((u) => u.id === id)?.username || "Unknown";

    let text = "Project Overview:\n\n";

    projects.forEach((project) => {
      text += `📌 Project: ${project.name} (${project.type})\n`;
      text += `👥 Members: ${
        project.members
          .map((m) => findUser(m.userId))
          .join(", ") || "None"
      }\n`;

      const tasksKey = `tasks-${project.createdAt}`;
      const tasks =
        JSON.parse(localStorage.getItem(tasksKey)) || [];

      if (tasks.length > 0) {
        text += `Tasks:\n`;
        tasks.forEach((task) => {
          text += ` - ${task.content || "Untitled task"} [${
            task.status
          }]`;
          if (task.assigneeId)
            text += ` (Assigned to: ${findUser(
              task.assigneeId
            )})`;
          text += `\n`;
        });
      } else {
        text += "No tasks yet.\n";
      }
      text += "\n";
    });

    return text;
  };

  const generateSummary = async () => {
    setLoading(true);
    try {
      const inputText = getProjectsAndTasks();

      console.log(inputText);

      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_HF_API_KEY
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: inputText }),
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
        <div className="mt-4 p-4 bg-surface rounded shadow whitespace-pre-line">
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summary;
