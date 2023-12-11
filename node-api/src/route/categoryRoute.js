const categoryController = require("../controller/categoryController");
const { userGuard } = require("../controller/AuthController");
const category = (app, base_route) => {
  app.get(
    base_route,
    userGuard("category.read"),
    categoryController.getAllCategory
  );
  app.get(
    `${base_route}/:id`,
    userGuard("category.read"),
    categoryController.getAllCategoryById
  );
  app.post(base_route, userGuard("category.create"), categoryController.create);
  app.put(base_route, userGuard("category.update"), categoryController.update);
  app.delete(
    `${base_route}/:id`,
    userGuard("category.delete"),
    categoryController.remove
  );
};

module.exports = category;
