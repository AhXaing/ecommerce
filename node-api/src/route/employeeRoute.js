const employeeController = require("../controller/employeeController");
const employee = (app) => {
  const route = "/api/employee";
  app.get(route, employeeController.getAllEmployee);
  app.get(`${route}/:id`, employeeController.getEmployeeById);
  app.post(route, employeeController.create);
  app.put(route, employeeController.update);
  app.delete(`${route}/:id`, employeeController.remove);
};

module.exports = employee;
