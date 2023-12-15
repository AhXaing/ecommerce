const ProvinceController = require("../controller/ProvinceController");

const role = (app, base_route) => {
  app.get(base_route, ProvinceController.getProvince);
  app.post(base_route, ProvinceController.create);
  app.put(base_route, ProvinceController.update);
  app.delete(base_route, ProvinceController.remove);
};

module.exports = role;
