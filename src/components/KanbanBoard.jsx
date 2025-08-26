import React from "react";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({
  tasks,
  statuses,
  moveTask,
  addTask,
  members,
  currentUser,
  onUpdateTask,
  userRole,
  onRenameColumn, // new
}) => {
  const tasksByStatus = (key) =>
    tasks.filter((t) => t.status === key);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {statuses.map((col) => (
        <KanbanColumn
          key={col.id}
          status={col}
          tasks={tasksByStatus(col.key)}
          moveTask={moveTask}
          addTask={addTask}
          members={members}
          currentUser={currentUser}
          onUpdateTask={onUpdateTask}
          userRole={userRole}
          onRenameColumn={onRenameColumn} // new
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
