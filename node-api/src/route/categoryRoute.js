const category = (app) => {
  app.get("/category", (req, res) => {
    res.send("category list");
  });
  app.get("/category/:id", (req, res) => {
    res.send("category list by id");
  });
  app.post("/category", (req, res) => {
    res.send("category create");
  });
  app.put("/category", (req, res) => {
    res.send("category update");
  });
  app.delete("/category", (req, res) => {
    res.send("category delete");
  });
};

module.exports = category;
