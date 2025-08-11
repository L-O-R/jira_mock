import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import CustomCursor from "./components/UI/CustomCursor";
import Summary from "./components/dashboard/Summary";
import ProjectOverview from "./components/dashboard/ProjectOverview";

const App = () => {
  return (
    <div className="relative">
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/Dashboard" element={<Dashboard />}>
            <Route
              path="/Dashboard"
              element={<Summary />}
            />
            <Route
              path="/Dashboard/overview"
              element={<ProjectOverview />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
