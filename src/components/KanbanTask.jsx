import React from "react";

const KanbanTask = ({
  task,
  moveTask,
  members = [],
  currentUser,
}) => {
  const assignee = members.find(
    (m) => m.userId === task.assigneeId
  );

  return (
    <div className="bg-surface p-3 mb-3 rounded shadow border border-border">
      <p className="text-text">{task.content}</p>

      {/* Assigned user */}
      <p className="text-sm text-secondary mt-1">
        Assigned to:{" "}
        {assignee ? assignee.username : "Unassigned"}
      </p>

      {/* Only admin/editor can reassign */}
      {(currentUser?.role === "admin" ||
        currentUser?.role === "editor") && (
        <select
          value={task.assigneeId || ""}
          onChange={(e) =>
            moveTask(task.id, 0, e.target.value)
          }
          className="mt-2 text-sm border border-border rounded p-1 bg-background">
          <option value="">Unassigned</option>
          {members.map((m) => (
            <option key={m.userId} value={m.userId}>
              {m.username}
            </option>
          ))}
        </select>
      )}

      <div className="mt-2 flex justify-between">
        <button
          onClick={() => moveTask(task.id, -1)}
          disabled={task.status === "todo"}
          className="text-sm px-2 py-1 bg-border text-text rounded disabled:opacity-40">
          ←
        </button>
        <button
          onClick={() => moveTask(task.id, 1)}
          disabled={task.status === "done"}
          className="text-sm px-2 py-1 bg-border text-text rounded disabled:opacity-40">
          →
        </button>
      </div>
    </div>
  );
};

export default KanbanTask;
