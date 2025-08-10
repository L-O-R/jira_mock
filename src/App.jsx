import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/Dashboard"
            element={<Dashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
