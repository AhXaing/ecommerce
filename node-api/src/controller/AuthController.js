const { TOKEN_KEY } = require("../util/validate");
const jwt = require("jsonwebtoken");

exports.userGuard = (req, res, next) => {
  var authorization = req.headers.authorization;
  var token_from_client = null;
  if (authorization != null && authorization != "") {
    token_from_client = authorization.split(" ")[1];
  }

  if (token_from_client == null) {
    res.status(401).send({
      message: "Unauthorized.",
    });
  } else {
    jwt.verify(token_from_client, TOKEN_KEY, (error, result) => {
      if (!error) {
        (req.user = result.data), (req.user_id = result.data.user.cus_id);
        next();
      } else {
        res.json({
          message: error,
        });
      }
    });
  }
};
