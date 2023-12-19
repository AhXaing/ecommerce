const urlController = require("../controller/urlController");
const { userGuard } = require("../controller/AuthController");
const url = (app, base_route) => {
  app.get(base_route, userGuard(), urlController.getUrl);
  app.post(base_route, urlController.create);
  app.put(base_route, urlController.update);
  app.delete(base_route, urlController.remove);
};

module.exports = url;
