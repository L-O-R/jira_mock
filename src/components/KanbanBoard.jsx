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
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-text">
      {statuses.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          moveTask={moveTask}
          addTask={addTask}
          members={members}
          currentUser={currentUser}
          onUpdateTask={onUpdateTask}
          userRole={userRole}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
