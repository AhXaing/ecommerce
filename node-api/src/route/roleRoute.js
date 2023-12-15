const RoleController = require("../controller/RoleController");

const role = (app, base_route) => {
  app.get(base_route, RoleController.getRole);
  app.post(base_route, RoleController.create);
  app.put(base_route, RoleController.update);
  app.delete(base_route, RoleController.remove);
};

module.exports = role;
