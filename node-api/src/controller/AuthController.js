const { TOKEN_KEY } = require("../util/validate");
const jwt = require("jsonwebtoken");
const db = require("../util/db");

exports.userGuard_V1 = (req, res, next) => {
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
        // check is has permission
        var permission = result.data.permission;
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

exports.getPermissionByUser = async (id) => {
  var sql =
    "SELECT" +
    " p.code" +
    " FROM tbl_employee c INNER JOIN tbl_role r ON c.role_id = r.role_id" +
    " INNER JOIN tbl_role_permission rp ON r.role_id = rp.role_id" +
    " INNER JOIN tbl_permission p ON p.permission_id = rp.permission_id" +
    " WHERE c.emp_id=?";

  var list = await db.query(sql, [id]);
  var tmpArr = [];
  list.map((item, index) => {
    tmpArr.push(item.code);
  });
  return tmpArr;
};

exports.userGuard = (parameter) => {
  return (req, res, next) => {
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
          // check is has permission
          var permission = result.data.permission;
          if (permission.includes(parameter)) {
            (req.user = result.data), (req.user_id = result.data.user.cus_id);
            next();
          }
          res.status(401).send({
            message: "No Permission.",
          });
        } else {
          res.json({
            message: error,
          });
        }
      });
    }
  };
};
