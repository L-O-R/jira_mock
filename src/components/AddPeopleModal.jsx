import React, { useState, useEffect } from "react";

const AddPeopleModal = ({ project, onClose }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [role, setRole] = useState("member");

  useEffect(() => {
    // Load all registered users
    const allUsers =
      JSON.parse(localStorage.getItem("userData")) || [];
    setUsers(allUsers);
  }, []);

  const handleAdd = () => {
    if (!selectedUserId) return;

    // Load all projects
    let projects =
      JSON.parse(localStorage.getItem("projectData")) || [];

    // Update current project
    const updatedProjects = projects.map((p) => {
      if (p.createdAt === project.createdAt) {
        const alreadyMember = p.members?.find(
          (m) => m.userId === parseInt(selectedUserId)
        );
        if (!alreadyMember) {
          const newMember = {
            userId: parseInt(selectedUserId),
            role,
          };
          return {
            ...p,
            members: [...(p.members || []), newMember],
          };
        }
      }
      return p;
    });

    // Save back
    localStorage.setItem(
      "projectData",
      JSON.stringify(updatedProjects)
    );

    onClose();
    window.location.reload(); // quick refresh to see changes immediately
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-surface p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-text">
          Add People
        </h2>

        {/* User Dropdown */}
        <label className="block mb-2 text-sm text-text">
          Select User
        </label>
        <select
          className="w-full p-2 border border-border rounded mb-4"
          value={selectedUserId}
          onChange={(e) =>
            setSelectedUserId(e.target.value)
          }>
          <option value="" className="text-text">
            -- Choose User --
          </option>
          {users.map((u) => (
            <option
              key={u.id}
              value={u.id}
              className="text-text">
              {u.username} ({u.email})
            </option>
          ))}
        </select>

        {/* Role Dropdown */}
        <label className="block mb-2 text-sm text-text">
          Assign Role
        </label>
        <select
          className="w-full p-2 border border-border rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
          <option value="viewer">Viewer</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-text rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-primary text-background rounded hover:bg-primary/80">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPeopleModal;
