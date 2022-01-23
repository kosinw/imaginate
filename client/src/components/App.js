import React from "react";
import { Router } from "@reach/router";
import Header from "./modules/Header";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Edit from "./pages/Edit";
import Fork from "./pages/Fork";
import Watch from "./pages/Watch";
import Create from "./pages/Create";
import Profile from "./pages/Profile";

import "@fontsource/archivo-black";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/700.css";

import "../scss/styles.scss";

const App = () => {
  return (
    <main className="App">
      <Header />
      <Router>
        <Index path="/" />
        <Create path="/create" />
        <Edit path="/edit/:animationId" />
        <Fork path="/fork/:animationId/:frameCount" />
        <Profile path="/profile/:userId" />
        <Watch path="/watch/:id" />
        <NotFound default />
      </Router>
    </main>
  );
};

export default App;
