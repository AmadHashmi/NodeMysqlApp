// const express = require("express");
// const bodyParser = require("body-parser");
// // create express app
// const app = express();
// // Setup server port
// const port = process.env.PORT || 3000;
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
// // parse requests of content-type - application/json
// app.use(bodyParser.json());
// // define a root route
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
// // Require user routes
// const userRoutes = require("./src/routes/user.routes");
// // using as middleware
// app.use("/api/v1/users", userRoutes);
// // listen for requests
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const userRoutes = require("./src/routes/user.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function setupRoutes() {
  // Root route
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  // User routes
  app.use("/api/v1/users", userRoutes);

  // Handle 404 - Route not found
  app.use((req, res, next) => {
    res.status(404).json({ error: true, message: "Route not found" });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: true, message: "Internal server error" });
  });
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  setupRoutes();
});

module.exports = app;
