import React from "react";
import KanbanTask from "./KanbanTask";

const KanbanColumn = ({
  status,
  tasks,
  moveTask,
  addTask,
  members,
  currentUser,
  onUpdateTask,
}) => {
  return (
    <div className="bg-surface rounded p-4 min-h-[200px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl text-text font-semibold capitalize">
          {status === "inprogress" ? "In Progress" : status}
        </h3>
        <button
          onClick={() => addTask(status)}
          className="text-sm bg-primary text-background px-2 py-1 rounded hover:bg-secondary">
          + Create
        </button>
      </div>

      {tasks.map((task) => (
        <KanbanTask
          key={task.id}
          task={task}
          moveTask={moveTask}
          members={members}
          currentUser={currentUser}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </div>
  );
};

export default KanbanColumn;
