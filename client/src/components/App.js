import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import useUser from "../hooks/useUser";

import "../utilities.css";
import "./App.css";

/**
 * Define the "App" component
 */
const App = () => {
  const { handleLogin, handleLogout, userId } = useUser();

  return (
    <>
      <NavBar userId={userId} handleLogin={handleLogin} handleLogout={handleLogout} />
      <Router className="App-view">
        <Skeleton path="/" />
        <Profile path="/profile" />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
