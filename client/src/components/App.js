import React from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import NotFound from "./pages/NotFound.js";
import Index from "./pages/Index";
import Editor from "./pages/Editor";
import Fork from "./pages/Fork";
import Watch from "./pages/Watch";
import NewAnimation from "./pages/NewAnimation";
import Profile from "./pages/Profile.js";

import "../scss/styles.scss";

/**
 * Define the "App" component
 */
const App = () => {
  return (
    <main className="App">
      <NavBar />
      <Router className="container mx-auto p-4">
        <Index path="/" />
        <NewAnimation path="/create" />
        <Editor path="/animation/:animationId/edit" />
        <Fork path="/animation/:animationId/fork/:frameCount" />
        <Profile path="/profile/:userId" />
        <Watch path="/watch/:id" />
        <NotFound default />
      </Router>
    </main>
  );
};

export default App;
