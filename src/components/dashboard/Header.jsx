import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to log out?"
    );
    if (confirmLogout) {
      localStorage.removeItem("isAuthenticated");
      //  user data to store and remove it from here
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="bg-surface text-text border-b border-border px-6 py-4">
      <div className=" flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Welcome To Jira Dashboard
          </h1>
        </div>

        <nav className="flex items-center space-x-4">
          <select className="bg-transparent border border-border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
            <option value="">Name</option>
            <option value="profile">Profile</option>
          </select>

          <button
            onClick={handleLogout}
            className="bg-surface border border-border cursor-pointer text-text px-4 py-1.5 rounded text-sm hover:bg-secoundary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
