const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getPermission = async (req, res) => {
  const listGroups = await db.query(
    "SELECT DISTINCT groups FROM tbl_permission"
  );
  const listData = await db.query("SELECT name,code FROM tbl_permission");
  const list = await db.query("SELECT * FROM tbl_permission");
  var tmpArr = [];
  var ArrData = [];
  var tmpList = [];
  listGroups.map((item, index) => {
    ArrData.push(item);
  });
  listData.map((item, index) => {
    tmpArr.push(item);
  });
  list.map((item, index) => {
    tmpList.push(item);
  });
  //return tmpArr;
  res.json({
    listGroups: ArrData,
    listData: tmpArr,
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
const update = (req, res) => {
  const { name, parent, status, category_id } = req.body;
  var message = {};
  if (isEmptyOrNull(name)) {
    message.name = "category name is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql =
    "UPDATE tbl_category SET name=?, parent=?, status=? WHERE category_id =?";
  var params_sql = [name, parent, status, category_id];
  db.query(sql, params_sql, (error, result) => {
    if (!error) {
      res.json({
        message: result.affectedRows
          ? "Category update successfully."
          : "Not Data in System.",
        data: result,
      });
    } else {
      res.json({
        error: true,
        message: error,
      });
    }
  });
};
const remove = (req, res) => {
  var { id } = req.params;
  var sql = "DELETE FROM tbl_category WHERE category_id=?";
  db.query(sql, [id], (error, result) => {
    if (!error) {
      res.json({
        message: result.affectedRows
          ? "Category deleted successfully."
          : "Not Data in System",
        data: result,
      });
    } else {
      res.json({
        error: true,
        message: error,
      });
    }
  });
};

module.exports = {
  getPermission,
  create,
  update,
  remove,
};
