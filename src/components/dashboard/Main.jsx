import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Summary from "./Summary";
import ProjectOverview from "./ProjectOverview";

const Main = () => {
  return (
    <main className="flex-2 overflow-y-auto pb-40 bg-surface">
      <Outlet />
    </main>
  );
};

export default Main;
