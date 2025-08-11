import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Summary from "./Summary";
import ProjectOverview from "./ProjectOverview";

const Main = () => {
  return (
    <main className="flex-2">
      <Outlet />
    </main>
  );
};

export default Main;
