const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

//allow origin (cors)
app.use(
  cors({
    origin: "*", //fixed has been blocked by CORS policy from Client Site
  })
);

app.get("/", (req, res) => {
  res.send("welcome node js.");
});

//
require("./src/route/categoryRoute")(app, "/api/category");
require("./src/route/productRoute")(app);
require("./src/route/employeeRoute")(app, "/api/employee");

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
