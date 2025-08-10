import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <div>
      <AuthPage />
      <BrowserRouter></BrowserRouter>
    </div>
  );
};

export default App;
