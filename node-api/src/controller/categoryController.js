const db = require("../util/db");

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
  res.json({
    list: "create category.",
  });
};
const update = (req, res) => {
  res.json({
    list: "update category.",
  });
};
const remove = (req, res) => {
  res.json({
    list: "remove category.",
  });
};

module.exports = {
  getAllCategory,
  getAllCategoryById,
  create,
  update,
  remove,
};
