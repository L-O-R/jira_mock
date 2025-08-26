import React, { useState } from "react";

const KanbanTask = ({
  task,
  moveTask,
  members = [],
  onUpdateTask,
  userRole,
}) => {
  const [showAssign, setShowAssign] = useState(false);

  const users =
    JSON.parse(localStorage.getItem("userData")) || [];
  const usernameById = (uid) =>
    users.find((u) => u.id === uid)?.username ||
    `User ${uid}`;
  const assigneeName = task.assigneeId
    ? usernameById(task.assigneeId)
    : null;

  const handleAssign = (userId) => {
    if (!onUpdateTask) return;
    const updatedTask = { ...task, assigneeId: userId };
    onUpdateTask(updatedTask);
    setShowAssign(false);
  };

  const onDragStart = (e) => {
    e.dataTransfer.setData("text/task-id", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="bg-white dark:bg-surface rounded border border-border p-3 shadow-sm cursor-move"
      draggable
      onDragStart={onDragStart}>
      <div className="font-medium">{task.content}</div>
      <div className="text-xs text-text/60 mt-1">
        Assigned to: {assigneeName || "Yet to be assigned"}
      </div>

      {userRole === "admin" && (
        <div className="mt-2">
          <button
            className="text-xs px-2 py-1 bg-secondary text-white rounded"
            onClick={() => setShowAssign((s) => !s)}>
            Assign
          </button>
          {showAssign && (
            <div className="mt-2 flex flex-wrap gap-2">
              {members?.length ? (
                members.map((m) => (
                  <button
                    key={m.userId}
                    className="text-xs px-2 py-1 border rounded hover:bg-surface"
                    onClick={() => handleAssign(m.userId)}>
                    {users.find((u) => u.id === m.userId)
                      ?.username || `User ${m.userId}`}{" "}
                    ({m.role})
                  </button>
                ))
              ) : (
                <span className="text-xs text-text/60">
                  No members
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KanbanTask;
