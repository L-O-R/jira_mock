import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/", { replace: true });
  };
  return (
    <div>
      Dashboard{" "}
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
