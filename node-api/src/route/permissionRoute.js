const PermissionController = require("../controller/PermissionController");

const permission = (app, base_route) => {
  app.get(base_route, PermissionController.getPermission);
  app.post(base_route, PermissionController.create);
  app.put(base_route, PermissionController.update);
  app.delete(`${base_route}/:id`, PermissionController.remove);
};

module.exports = permission;
