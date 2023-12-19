const db = require("../util/db");
const { isEmptyOrNull, TOKEN_KEY, REFRESH_KEY } = require("../util/validate");
const jwt = require("jsonwebtoken");
const getUrl = async (req, res) => {
  var { name } = req.param;
  var sql = "SELECT * FROM tbl_url";
  const list = await db.query(sql, [name]);
  res.json({
    list: list,
  });
};

const create = async (req, res) => {
  const { name, description } = req.body;
  var message = {};
  if (isEmptyOrNull(name)) {
    message.name = "name is required.";
  }

  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql = "INSERT INTO tbl_province(name,description) VALUES (?,?)";
  var params_sql = [name, description];
  var listProvince = await db.query(sql, params_sql);
  res.json({
    message: "Province is created.",
    list: listProvince,
  });
};
const update = async (req, res) => {
  const { name, description, province_id } = req.body;
  var message = {};
  if (isEmptyOrNull(name)) {
    message.name = "name is required.";
  }

  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql =
    "UPDATE tbl_province SET name=?, description=? WHERE province_id =?";
  var params_sql = [name, description, province_id];
  const list = await db.query(sql, params_sql);
  res.json({
    message: "Province updated successfully.",
    list: list,
  });
};
const remove = async (req, res) => {
  const { id } = req.body;
  var sql = "DELETE FROM tbl_province WHERE province_id=?";
  const list = await db.query(sql, [id]);
  res.json({
    message: list.affectedRows
      ? "Province deleted successfully."
      : "Not Data in System",
    list: list,
  });
};

module.exports = {
  getUrl,
  create,
  update,
  remove,
};
