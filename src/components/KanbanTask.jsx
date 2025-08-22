import React, { useState } from "react";

const KanbanTask = ({
  task,
  moveTask,
  members = [],
  onUpdateTask,
  userRole,
}) => {
  const [showAssign, setShowAssign] = useState(false);

  // All registered users (for names)
  const users =
    JSON.parse(localStorage.getItem("userData")) || [];
  const usernameById = (uid) =>
    users.find((u) => u.id === uid)?.username ||
    `User ${uid}`;

  const assigneeName = task.assigneeId
    ? usernameById(task.assigneeId)
    : null;

  const handleAssign = (userId) => {
    if (!onUpdateTask) return; // safety
    const updatedTask = { ...task, assigneeId: userId };
    onUpdateTask(updatedTask);
    setShowAssign(false);
  };

  return (
    <div className="bg-white p-3 mb-3 rounded shadow relative">
      <p className="font-medium">{task.content}</p>

      <p className="text-xs text-gray-600 mb-2">
        Assigned to: {assigneeName || "Yet to be assigned"}
      </p>

      <div className="mt-2 flex justify-between">
        <button
          onClick={() => moveTask(task.id, -1)}
          disabled={task.status === "todo"}
          className="text-sm px-2 py-1 bg-gray-300 rounded disabled:opacity-40">
          ←
        </button>
        {userRole === "admin" && (
          <button
            onClick={() => setShowAssign((s) => !s)}
            className="text-sm px-2 py-1 bg-primary text-background rounded hover:bg-primary/80">
            Assign
          </button>
        )}
        <button
          onClick={() => moveTask(task.id, 1)}
          disabled={task.status === "done"}
          className="text-sm px-2 py-1 bg-gray-300 rounded disabled:opacity-40">
          →
        </button>
      </div>

      {showAssign && (
        <div className="absolute top-12 right-2 bg-surface border border-border rounded shadow-lg p-2 z-50 w-48">
          {members.length > 0 ? (
            members.map((m) => (
              <button
                key={m.userId}
                onClick={() => handleAssign(m.userId)}
                className="block w-full text-left px-2 py-1 hover:bg-primary/10 rounded">
                {usernameById(m.userId)}{" "}
                <span className="text-xs text-gray-500">
                  ({m.role})
                </span>
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500 px-2 py-1">
              No members
            </p>
          )}
          <button
            onClick={() => handleAssign(null)}
            className="block w-full text-left mt-1 px-2 py-1 hover:bg-primary/10 rounded text-sm">
            Unassign
          </button>
        </div>
      )}
    </div>
  );
};

export default KanbanTask;
