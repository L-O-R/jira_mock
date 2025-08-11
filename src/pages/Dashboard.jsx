import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/dashboard/Header";
import Main from "../components/dashboard/Main";
import Sidebar from "../components/dashboard/Sidebar";

const Dashboard = () => {
  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="md:flex items-stretch h-full ">
        <Sidebar />
        <Main />
      </div>
    </section>
  );
};

export default Dashboard;
