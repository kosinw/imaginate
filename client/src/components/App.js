import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import useUser from "../hooks/useUser";

import "../utilities.css";

/**
 * Define the "App" component
 */
const App = () => {
  const { handleLogin, handleLogout, userId } = useUser();

  return (
    <>
      <Router>
        <Skeleton path="/" userId={userId} handleLogin={handleLogin} handleLogout={handleLogout} />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
