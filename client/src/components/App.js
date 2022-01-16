import React from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import NotFound from "./pages/NotFound.js";
import Index from "./pages/Index";
import Profile from "./pages/Profile.js";
import useUser from "../hooks/useUser";

import "../scss/styles.scss";

/**
 * Define the "App" component
 */
const App = () => {
  const { handleLogin, handleLogout, userId } = useUser();

  return (
    <main className="App">
      <NavBar userId={userId} handleLogin={handleLogin} handleLogout={handleLogout} />
      <Router className="container">
        <Index path="/" />
        <Profile path="/profile/:userId" />
        <NotFound default />
      </Router>
    </main>
  );
};

export default App;
