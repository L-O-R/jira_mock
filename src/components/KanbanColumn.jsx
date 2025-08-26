import React, { useCallback, useState } from "react";
import KanbanTask from "./KanbanTask";

const KanbanColumn = ({
  status, // { id, name, key }
  tasks,
  moveTask,
  addTask,
  members,
  currentUser,
  onUpdateTask,
  userRole,
  onRenameColumn, // new
}) => {
  const [isOver, setIsOver] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const onDragLeave = () => setIsOver(false);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsOver(false);
      const taskId = e.dataTransfer.getData("text/task-id");
      if (!taskId) return;
      onUpdateTask({ id: taskId, status: status.key });
    },
    [onUpdateTask, status.key]
  );

  return (
    <div
      className={`rounded-lg p-3 bg-surface border border-border min-h-64 transition-colors ${
        isOver ? "ring-2 ring-secondary" : ""
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{status.name}</h3>
        <div className="flex items-center gap-1">
          {userRole === "admin" && (
            <>
              <button
                className="px-2 py-1 text-xs bg-primary text-white rounded"
                onClick={() => addTask(status.key)}>
                + Add
              </button>
              <button
                className="px-2 py-1 text-xs border rounded"
                onClick={() => onRenameColumn?.(status.id)}
                title="Rename column">
                Rename
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((t) => (
          <KanbanTask
            key={t.id}
            task={t}
            moveTask={moveTask}
            members={members}
            onUpdateTask={onUpdateTask}
            userRole={userRole}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-sm text-text/60">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
