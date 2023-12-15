const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getPermission = async (req, res) => {
  //const listData = await db.query("SELECT name,code FROM tbl_permission");
  var sqlPermission = "SELECT * FROM tbl_permission";
  // "SELECT DISTINCT groups,GROUP_CONCAT(name ORDER BY permission_id DESC) as name ,GROUP_CONCAT(code ORDER BY permission_id) as code FROM tbl_permission GROUP BY groups";
  const list = await db.query(sqlPermission);
  var tmpList = [];
  list.map((item, index) => {
    tmpList.push(item);
  });
  res.json({
    list: tmpList,
  });
};

const create = async (req, res) => {
  const { name, code, groups } = req.body;
  var message = {};
  if (isEmptyOrNull(name)) {
    message.name = "name is required.";
  }
  if (isEmptyOrNull(code)) {
    message.code = "code is required.";
  }
  if (isEmptyOrNull(groups)) {
    message.groups = "groups is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql = "INSERT INTO tbl_permission(name,code,groups) VALUES (?,?,?)";
  var params_sql = [name, code, groups];
  var listPermission = await db.query(sql, params_sql);
  res.json({
    message: "Permission is created.",
    list: listPermission,
  });
};
const update = async (req, res) => {
  const { groups, name, code, permission_id } = req.body;
  var message = {};
  if (isEmptyOrNull(name)) {
    message.name = "name is required.";
  }
  if (isEmptyOrNull(groups)) {
    message.groups = "groups is required.";
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
  var sql =
    "UPDATE tbl_permission SET groups=?, name=?, code=? WHERE permission_id =?";
  var params_sql = [groups, name, code, permission_id];
  const list = await db.query(sql, params_sql);
  res.json({
    message: "Permission updated successfully.",
    list: list,
  });
};
const remove = async (req, res) => {
  const { id } = req.body;
  var sql = "DELETE FROM tbl_permission WHERE permission_id=?";
  const list = await db.query(sql, [id]);
  res.json({
    message: list.affectedRows
      ? "Category deleted successfully."
      : "Not Data in System",
    list: list,
  });
};

module.exports = {
  getPermission,
  create,
  update,
  remove,
};
