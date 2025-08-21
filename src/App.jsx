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
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ProjectDetails from "./components/dashboard/ProjectDetails";
import NotificationModel from "./components/UI/NotificationModel";

const App = () => {
  return (
    <div className="relative">
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
            <Route index element={<Summary />} />
            <Route
              path="overview"
              element={<ProjectOverview />}
            />
            <Route
              path=":id"
              element={<ProjectDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
