const employeeController = require("../controller/employeeController");
const employee = (app, base_route) => {
  app.get(base_route, employeeController.getAllEmployee);
  app.get(`${base_route}/:id`, employeeController.getEmployeeById);
  app.post(base_route, employeeController.create);
  app.put(base_route, employeeController.update);
  app.delete(`${base_route}/:id`, employeeController.remove);
};

module.exports = employee;
