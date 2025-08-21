import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import AddPeopleModal from "../AddPeopleModal";
import KanbanBoard from "../KanbanBoard";

const statuses = ["todo", "inprogress", "done"];

const ProjectDetails = () => {
  const { id } = useParams(); // projectId = createdAt
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddPeople, setShowAddPeople] = useState(false);

  const refreshProject = useCallback(() => {
    const projects =
      JSON.parse(localStorage.getItem("projectData")) || [];
    const found =
      projects.find((p) => p.createdAt === id) || null;
    setProject(found);
  }, [id]);

  useEffect(() => {
    // load project + tasks + user
    refreshProject();
    const storedTasks =
      JSON.parse(localStorage.getItem(`tasks-${id}`)) || [];
    setTasks(storedTasks);
    setCurrentUser(
      JSON.parse(localStorage.getItem("user")) || null
    );
  }, [id, refreshProject]);

  const moveTask = (taskId, direction) => {
    const updated = tasks.map((task) => {
      if (task.id === taskId) {
        const currentIndex = statuses.indexOf(task.status);
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < statuses.length) {
          return { ...task, status: statuses[newIndex] };
        }
      }
      return task;
    });
    setTasks(updated);
    localStorage.setItem(
      `tasks-${id}`,
      JSON.stringify(updated)
    );
  };

  const addTask = (status) => {
    const content = prompt(
      `Enter task for ${status.toUpperCase()}:`
    );
    if (!content) return;
    const newTask = {
      id: Date.now().toString(),
      content,
      status,
      assigneeId: null, // unassigned by default
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem(
      `tasks-${id}`,
      JSON.stringify(updated)
    );
  };

  // Called by KanbanTask when assigning or editing the task
  const onUpdateTask = (updatedTask) => {
    const newTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(newTasks);
    localStorage.setItem(
      `tasks-${id}`,
      JSON.stringify(newTasks)
    );
  };

  if (!project)
    return (
      <p className="p-6 text-text">Project not found</p>
    );

  return (
    <div className="p-6 bg-border min-h-screen">
      {/* Header with members + Add People */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text">
          {project.name} – Kanban Board
        </h2>

        <div className="flex items-center gap-4">
          {(project.members || []).map((m) => {
            const users =
              JSON.parse(
                localStorage.getItem("userData")
              ) || [];
            const user = users.find(
              (u) => u.id === m.userId
            );
            return (
              <div
                key={m.userId}
                className="flex items-center gap-2 bg-surface px-3 py-1 rounded-lg shadow">
                <div className="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-medium">
                  {user?.username?.[0]?.toUpperCase() ||
                    "U"}
                </div>
                <div>
                  <p className="text-sm font-medium text-text">
                    {user?.username || `User ${m.userId}`}
                  </p>
                  <span className="text-xs text-secondary capitalize">
                    {m.role}
                  </span>
                </div>
              </div>
            );
          })}

          <button
            onClick={() => setShowAddPeople(true)}
            className="px-3 py-1 bg-primary text-background rounded-lg hover:bg-primary/80">
            + Add People
          </button>
        </div>
      </div>

      {showAddPeople && (
        <AddPeopleModal
          project={project}
          onClose={() => {
            setShowAddPeople(false);
            // re-read project so the members list updates without a full refresh
            refreshProject();
          }}
        />
      )}

      {/* Kanban Board */}
      <KanbanBoard
        tasks={tasks}
        statuses={statuses}
        moveTask={moveTask}
        addTask={addTask}
        members={project.members || []}
        currentUser={currentUser}
        onUpdateTask={onUpdateTask}
      />
    </div>
  );
};

export default ProjectDetails;
