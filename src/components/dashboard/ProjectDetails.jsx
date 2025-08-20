import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPeopleModal from "../AddPeopleModal"; // same modal we built earlier

const statuses = ["todo", "inprogress", "done"];

const ProjectDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [showAddPeople, setShowAddPeople] = useState(false);

  useEffect(() => {
    // ✅ load project
    const projects =
      JSON.parse(localStorage.getItem("projectData")) || [];
    const found = projects.find((p) => p.createdAt === id);
    setProject(found);

    // ✅ load tasks
    const storedTasks =
      JSON.parse(localStorage.getItem(`tasks-${id}`)) || [];
    setTasks(storedTasks);
  }, [id]);

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
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem(
      `tasks-${id}`,
      JSON.stringify(updated)
    );
  };

  if (!project)
    return (
      <p className="p-6 text-text">Project not found</p>
    );

  return (
    <div className="p-6 bg-border min-h-screen">
      {/* Project Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text">
          {project.name} – Kanban Board
        </h2>

        {/* Members List */}
        <div className="flex items-center gap-4">
          {project.members &&
            project.members.map((m) => {
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
                      {user?.username || "Unknown"}
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

      {/* Add People Modal */}
      {showAddPeople && (
        <AddPeopleModal
          project={project}
          onClose={() => setShowAddPeople(false)}
        />
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-3 gap-4 text-text">
        {statuses.map((status) => (
          <div
            key={status}
            className="bg-surface rounded p-4 min-h-[200px]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl text-text font-semibold capitalize">
                {status.replace(
                  "inprogress",
                  "In Progress"
                )}
              </h3>
              <button
                onClick={() => addTask(status)}
                className="text-sm bg-primary text-background px-2 py-1 rounded hover:bg-primary/80">
                + Create
              </button>
            </div>

            {tasks
              .filter((t) => t.status === status)
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-3 mb-3 rounded shadow">
                  <p>{task.content}</p>
                  <div className="mt-2 flex justify-between">
                    <button
                      onClick={() => moveTask(task.id, -1)}
                      disabled={status === "todo"}
                      className="text-sm px-2 py-1 bg-gray-300 rounded disabled:opacity-40">
                      ←
                    </button>
                    <button
                      onClick={() => moveTask(task.id, 1)}
                      disabled={status === "done"}
                      className="text-sm px-2 py-1 bg-gray-300 rounded disabled:opacity-40">
                      →
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
