const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getRole = async (req, res) => {
  var sqlRole = "SELECT * FROM tbl_role";
  const list = await db.query(sqlRole);
  res.json({
    list: list,
  });
};

const create = async (req, res) => {
  const { name, code } = req.body;
  var message = {};
  if (isEmptyOrNull(name)) {
    message.name = "name is required.";
  }
  if (isEmptyOrNull(code)) {
    message.code = "code is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql = "INSERT INTO tbl_role(name,code) VALUES (?,?)";
  var params_sql = [name, code];
  var listrole = await db.query(sql, params_sql);
  res.json({
    message: "role is created.",
    list: listrole,
  });
};
const update = async (req, res) => {
  const { name, code, role_id } = req.body;
  var message = {};
  if (isEmptyOrNull(name)) {
    message.name = "name is required.";
  }
  if (isEmptyOrNull(code)) {
    message.code = "code is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql = "UPDATE tbl_role SET name=?, code=? WHERE role_id =?";
  var params_sql = [name, code, role_id];
  const list = await db.query(sql, params_sql);
  res.json({
    message: "role updated successfully.",
    list: list,
  });
};
const remove = async (req, res) => {
  const { id } = req.body;
  var sql = "DELETE FROM tbl_role WHERE role_id=?";
  const list = await db.query(sql, [id]);
  res.json({
    message: list.affectedRows
      ? "Role deleted successfully."
      : "Not Data in System",
    list: list,
  });
};

module.exports = {
  getRole,
  create,
  update,
  remove,
};
