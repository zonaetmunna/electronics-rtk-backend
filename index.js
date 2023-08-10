// import external
const express = require("express");
const cors = require("cors");
require("dotenv").config();
// import internal
const db = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");
const routes = require("./src/routes/routes");

// app and port declared
const app = express();
const port = process.env.PORT || 5000;

// default middleware
app.use(cors());
app.use(express.json());

// app routes
app.get("/", (req, res) => {
  res.json("hi electronics backend");
});
app.use("/api/v1", routes);

// app error handler
app.use(errorHandler);

// app listen
app.listen(port, () => {
  console.log("listing the server port", port);
});
