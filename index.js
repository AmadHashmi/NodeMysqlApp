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
