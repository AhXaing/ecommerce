const categoryController = require("../controller/categoryController");
const category = (app) => {
  app.get("/category", categoryController.getAllCategory);
  app.get("/category/:id", categoryController.getAllCategoryById);
  app.post("/category", categoryController.create);
  app.put("/category", categoryController.update);
  app.delete("/category", categoryController.remove);
};

module.exports = category;
