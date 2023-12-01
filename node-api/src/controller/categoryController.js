const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getAllCategory = (req, res) => {
  var sql = "SELECT * FROM tbl_category";
  db.query(sql, (err, result) => {
    if (!err) {
      res.json({
        data: result,
      });
    } else {
      res.json({
        message: err,
        err: true,
      });
    }
  });
};
const getAllCategoryById = (req, res) => {
  var { id } = req.params;
  var sql = "SELECT * FROM tbl_category WHERE category_id =?";
  db.query(sql, [id], (error, result) => {
    if (!error) {
      res.json({
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
const create = (req, res) => {
  const { cate_name, parent_id, status } = req.body;
  var message = {};
  if (isEmptyOrNull(cate_name)) {
    message.cate_name = "category name is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }

  var sql =
    "INSERT INTO tbl_category(cate_name,parent_id,status) VALUES (?,?,?)";
  var params_sql = [cate_name, parent_id, status];
  db.query(sql, params_sql, (error, result) => {
    if (!error) {
      res.json({
        message: result.affectedRows
          ? "Category create successfully."
          : "Category can not create.",
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
const update = (req, res) => {
  const { cate_name, parent_id, status, category_id } = req.body;
  var message = {};
  if (isEmptyOrNull(cate_name)) {
    message.cate_name = "category name is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql =
    "UPDATE tbl_category SET cate_name=?, parent_id=?, status=? WHERE category_id =?";
  var params_sql = [cate_name, parent_id, status, category_id];
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
  getAllCategory,
  getAllCategoryById,
  create,
  update,
  remove,
};
