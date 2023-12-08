const employeeController = require("../controller/employeeController");
const { userGuard } = require("../controller/AuthController");
const employee = (app, base_route) => {
  app.get(base_route, userGuard, employeeController.getAllEmployee);
  app.get(`${base_route}/:id`, userGuard, employeeController.getEmployeeById);
  app.post(base_route, userGuard, employeeController.create);
  app.put(base_route, userGuard, employeeController.update);
  app.delete(`${base_route}/:id`, userGuard, employeeController.remove);
};

module.exports = employee;
