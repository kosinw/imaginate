import React from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import NotFound from "./pages/NotFound.js";
import Index from "./pages/Index";
import Animation from "./pages/Animation";
import Editor from "./pages/Editor";
import NewAnimation from "./pages/NewAnimation";
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
        <NewAnimation path="/create" />
        <Animation path="/animation/:animationId" />
        <Editor path="/animation/:animationId/edit" />
        <Profile path="/profile/:userId" />
        <NotFound default />
      </Router>
    </main>
  );
};

export default App;
