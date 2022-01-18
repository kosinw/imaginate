import React from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import NotFound from "./pages/NotFound.js";
import Index from "./pages/Index";
import Animation from "./pages/Animation";
import Editor from "./pages/Editor";
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
        <Animation path="/animation/:animationId" />
        <Editor path="/animation/:animationId/edit" />
        <Profile path="/profile/:userId" />
        <Watch path="/watch/:id" />
        <NotFound default />
      </Router>
    </main>
  );
};

export default App;
