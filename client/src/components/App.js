import React from "react";
import { Router } from "@reach/router";
import { SWRConfig } from "swr";
import { Toaster, toast } from "react-hot-toast";

import Header from "./modules/Header";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Edit from "./pages/Edit";
import Fork from "./pages/Fork";
import Watch from "./pages/Watch";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import fetcher from "../lib/utils/fetcher";

import "@fontsource/archivo-black";
import "@fontsource/poppins/300.css"
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/700.css";

import "../scss/styles.scss";

const App = () => {
  const onErrorRetry = (error, key, config, revalidate, { retryCount }) => {
    // Only retry twice.
    if (retryCount >= 2) return;
  }

  return (
    <React.Fragment>
      <SWRConfig value={{ fetcher, onErrorRetry }}>
        <main className="App">
          <Header />
          <Router className="h-full">
            <Index path="/" />
            <Create path="/create" />
            <Edit path="/edit/:animationId" />
            <Fork path="/fork/:animationId/:frameCount" />
            <Profile path="/profile/:userId" />
            <Watch path="/watch/:id" />
            <NotFound default />
          </Router>
        </main>
      </SWRConfig>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </React.Fragment>
  );
};

export default App;
