import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import AddPeopleModal from "../AddPeopleModal";
import KanbanBoard from "../KanbanBoard";

const toKey = (label) => {
  const base = String(label || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "column";
};

const ProjectDetails = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddPeople, setShowAddPeople] = useState(false);
  const [columns, setColumns] = useState([]);

  const loadProjects = () =>
    JSON.parse(localStorage.getItem("projectData")) || [];
  const saveProjects = (projects) =>
    localStorage.setItem(
      "projectData",
      JSON.stringify(projects)
    );

  const persistProject = (updatedProject) => {
    const projects = loadProjects();
    const next = projects.map((p) =>
      p.createdAt === updatedProject.createdAt
        ? updatedProject
        : p
    );
    saveProjects(next);
  };

  const refreshProject = useCallback(() => {
    const projects = loadProjects();
    const found =
      projects.find((p) => p.createdAt === id) || null;

    if (found) {
      if (
        !Array.isArray(found.columns) ||
        found.columns.length === 0
      ) {
        found.columns = [
          {
            id: "col-todo",
            name: "TO DO List",
            key: "todo",
          },
          {
            id: "col-inprogress",
            name: "In Progress",
            key: "inprogress",
          },
          { id: "col-done", name: "Done", key: "done" },
        ];
        persistProject(found);
      }
      setColumns(found.columns);
    }
    setProject(found);
  }, [id]);

  useEffect(() => {
    refreshProject();
    const storedTasks =
      JSON.parse(localStorage.getItem(`tasks-${id}`)) || [];
    setTasks(storedTasks);
    setCurrentUser(
      JSON.parse(localStorage.getItem("user")) || null
    );
  }, [id, refreshProject]);

  const statusOrder = columns.map((c) => c.key);

  const moveTask = (taskId, direction) => {
    if (!statusOrder.length) return;
    const updated = tasks.map((task) => {
      if (task.id === taskId) {
        const currentIndex = statusOrder.indexOf(
          task.status
        );
        const newIndex = currentIndex + direction;
        if (
          newIndex >= 0 &&
          newIndex < statusOrder.length
        ) {
          return { ...task, status: statusOrder[newIndex] };
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
      assigneeId: null,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem(
      `tasks-${id}`,
      JSON.stringify(updated)
    );
  };

  const onUpdateTask = (updatedTask) => {
    const existing = tasks.find(
      (t) => t.id === updatedTask.id
    );
    if (!existing) return;
    const merged = { ...existing, ...updatedTask };
    const newTasks = tasks.map((t) =>
      t.id === merged.id ? merged : t
    );
    setTasks(newTasks);
    localStorage.setItem(
      `tasks-${id}`,
      JSON.stringify(newTasks)
    );
  };

  let userRole = "viewer";
  if (project && currentUser) {
    if (project.userId === currentUser.id) {
      userRole = "admin";
    } else {
      userRole =
        project.members?.find(
          (m) => m.userId === currentUser.id
        )?.role || "viewer";
    }
  }

  if (!project)
    return (
      <div className="p-6 text-red-600">
        Project not found
      </div>
    );

  const members = project.members || [];
  const users =
    JSON.parse(localStorage.getItem("userData")) || [];
  const usernameById = (uid) =>
    users.find((u) => u.id === uid)?.username ||
    `User ${uid}`;

  const canAddMembers = userRole === "admin";
  const canManageColumns = userRole === "admin"; // limit to admins
  const canAddTasks =
    userRole === "admin" || userRole === "editor";

  // Add Column
  const handleAddColumn = () => {
    if (!canManageColumns) return;
    const name = prompt("Enter new column name:");
    if (!name) return;
    const existingKeys = new Set(columns.map((c) => c.key));
    let keyBase = toKey(name);
    let key = keyBase;
    let n = 2;
    while (existingKeys.has(key)) {
      key = `${keyBase}-${n++}`;
    }
    const newCol = {
      id: `col-${Date.now()}`,
      name: name.trim(),
      key,
    };
    const nextCols = [...columns, newCol];
    setColumns(nextCols);

    const updatedProject = {
      ...project,
      columns: nextCols,
    };
    setProject(updatedProject);
    persistProject(updatedProject);
  };

  // Rename Column (optionally change key and migrate tasks)
  const handleRenameColumn = (colId) => {
    if (!canManageColumns) return;
    const col = columns.find((c) => c.id === colId);
    if (!col) return;

    const newName = prompt(
      "Enter new column name:",
      col.name
    );
    if (!newName || newName.trim() === col.name) {
      // name unchanged or canceled
      return;
    }

    // Ask if key should follow the name (optional)
    const shouldChangeKey = confirm(
      "Also change the column key to match the new name? (This will migrate existing tasks to the new key.)"
    );

    let nextCols = columns.map((c) =>
      c.id === colId ? { ...c, name: newName.trim() } : c
    );

    let nextTasks = tasks;
    if (shouldChangeKey) {
      const existingKeys = new Set(
        columns
          .filter((c) => c.id !== colId)
          .map((c) => c.key)
      );
      const newKeyBase = toKey(newName);
      let newKey = newKeyBase || col.key;
      let n = 2;
      while (existingKeys.has(newKey)) {
        newKey = `${newKeyBase}-${n++}`;
      }

      // Update column key
      nextCols = nextCols.map((c) =>
        c.id === colId ? { ...c, key: newKey } : c
      );

      // Migrate tasks from old key to new key
      nextTasks = tasks.map((t) =>
        t.status === col.key ? { ...t, status: newKey } : t
      );
      setTasks(nextTasks);
      localStorage.setItem(
        `tasks-${id}`,
        JSON.stringify(nextTasks)
      );
    }

    setColumns(nextCols);

    const updatedProject = {
      ...project,
      columns: nextCols,
    };
    setProject(updatedProject);
    persistProject(updatedProject);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-surface border border-border rounded-lg p-3">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-text">
            {project.name || "Project"}
          </h1>
          <div className="text-sm text-text/60">
            {columns.length} columns • {tasks.length} tasks
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {members.length ? (
              members.map((m) => (
                <span
                  key={m.userId}
                  className="px-2 py-0.5 text-xs rounded-full border border-border bg-white dark:bg-surface text-text"
                  title={`${usernameById(m.userId)} • ${
                    m.role
                  }`}>
                  {usernameById(m.userId)} — {m.role}
                </span>
              ))
            ) : (
              <span className="text-xs text-text/60">
                No members yet
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            disabled={!canAddTasks}
            className="px-3 py-2 rounded bg-primary text-white text-sm disabled:opacity-50"
            onClick={() => {
              if (!columns.length) return;
              if (columns.length === 1) {
                addTask(columns[0].key);
                return;
              }
              const choice = prompt(
                `Add task to which column?\n${columns
                  .map(
                    (c, i) =>
                      `${i + 1}. ${c.name} (${c.key})`
                  )
                  .join("\n")}\nEnter number:`
              );
              const idx = Number(choice) - 1;
              if (
                !Number.isInteger(idx) ||
                idx < 0 ||
                idx >= columns.length
              )
                return;
              addTask(columns[idx].key);
            }}>
            + Add Task
          </button>

          <button
            disabled={!canAddMembers}
            className="px-3 py-2 rounded border border-border text-sm hover:bg-surface disabled:opacity-50"
            onClick={() => setShowAddPeople(true)}>
            Add Member
          </button>

          <button
            disabled={!canManageColumns}
            className="px-3 py-2 rounded border border-border text-sm hover:bg-surface disabled:opacity-50"
            onClick={handleAddColumn}
            title={
              canManageColumns
                ? "Add a new column"
                : "Only admins can add columns"
            }>
            + Add Column
          </button>
        </div>
      </div>

      {/* Board */}
      <KanbanBoard
        tasks={tasks}
        statuses={columns}
        moveTask={moveTask}
        addTask={addTask}
        members={members}
        currentUser={currentUser}
        onUpdateTask={onUpdateTask}
        userRole={userRole}
        onRenameColumn={handleRenameColumn} // new
      />

      {showAddPeople && (
        <AddPeopleModal
          onClose={() => setShowAddPeople(false)}
          projectId={id}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
