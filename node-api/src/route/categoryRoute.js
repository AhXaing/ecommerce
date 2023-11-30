const categoryController = require("../controller/categoryController");
const category = (app) => {
  const route = "/api/category";
  app.get(route, categoryController.getAllCategory);
  app.get(`${route}/:id`, categoryController.getAllCategoryById);
  app.post(route, categoryController.create);
  app.put(`${route}/:id`, categoryController.update);
  app.delete(route, categoryController.remove);
};

module.exports = category;
