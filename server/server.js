/*
|--------------------------------------------------------------------------
| server.js -- The core of your server
|--------------------------------------------------------------------------
|
| This file defines how your server starts up. Think of it as the main() of your server.
| At a high level, this file does the following things:
| - Connect to the database
| - Sets up server middleware (i.e. addons that enable things like json parsing, user login)
| - Hooks up all the backend routes specified in api.js
| - Fowards frontend routes that should be handled by the React router
| - Sets up error handling in case something goes wrong when handling a request
| - Actually starts the webserver
*/

//import libraries needed for the webserver to work!
const http = require("http");
const express = require("express"); // backend framework for our node server.
const connect = require("./database"); // module to connect to MongoDB
const path = require("path"); // provide utilities for working with file and directory paths
const morgan = require('morgan');

connect();

const routes = require("./routes");
const AuthMiddleware = require('./middlewares/auth');
const ErrorMiddleware = require('./middlewares/error');

// create a new express server
const app = express();

// enable logging
app.use(morgan('dev'));

// allow us to process POST requests
app.use(express.json());

// this checks if the user is logged in, and populates "req.user"
app.use(AuthMiddleware.populate);

// connect user-defined routes
app.use("/api", routes);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// for all other routes, render index.html and let reach router handle it
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

app.use(ErrorMiddleware.errors);

// hardcode port to 3000 for now
const port = process.env.PORT || 3000;
const server = http.Server(app);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
