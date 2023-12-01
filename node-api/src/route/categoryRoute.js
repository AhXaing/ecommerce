const categoryController = require("../controller/categoryController");
const category = (app, base_route) => {
  app.get(base_route, categoryController.getAllCategory);
  app.get(`${base_route}/:id`, categoryController.getAllCategoryById);
  app.post(base_route, categoryController.create);
  app.put(`${base_route}/:id`, categoryController.update);
  app.delete(`${base_route}/:id`, categoryController.remove);
};

module.exports = category;
