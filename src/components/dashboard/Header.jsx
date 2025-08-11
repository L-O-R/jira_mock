import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <header className="bg-[var(--color-surface)] text-[var(--color-text)] border-b border-[var(--color-border)] px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Welcome To Jira Dashboard
          </h1>
        </div>

        <nav className="flex items-center space-x-4">
          <select className="bg-transparent border border-[var(--color-border)] rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer">
            <option value="">Name</option>
            <option value="profile">Profile</option>
          </select>

          <button
            onClick={handleLogout}
            className="bg-[var(--color-primary)] text-white px-4 py-1.5 rounded text-sm hover:bg-[var(--color-secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
