const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");
const getAllEmployee = (req, res) => {
  var sql = "SELECT * FROM tbl_employee";
  db.query(sql, (err, result) => {
    if (err) {
      res.json({
        message: err,
      });
    } else {
      res.json({
        list: result,
      });
    }
  });
};
const getEmployeeById = (req, res) => {
  const id = req.params.id;
  var sql = "SELECT * FROM tbl_employee WHERE emp_id = ?";
  db.query(sql, [id], (err, result) => {
    if (!err) {
      res.json({
        list: result,
      });
    } else {
      res.json({
        message: err,
        err: true,
      });
    }
  });
};
const create = (req, res) => {
  const {
    emp_firstname,
    emp_lastname,
    phone,
    email,
    salary,
    address,
    province,
    country,
  } = req.body;

  //   validate field
  var message = {};
  if (isEmptyOrNull(emp_firstname)) {
    message.emp_firstname = "first name is required.";
  }
  if (isEmptyOrNull(emp_lastname)) {
    message.emp_lastname = "last name is required.";
  }
  if (isEmptyOrNull(phone)) {
    message.phone = "phone is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql =
    "INSERT INTO tbl_employee (emp_firstname,emp_lastname,phone,email,salary,address,province,country) VALUES (?,?,?,?,?,?,?,?)";
  var params_data = [
    emp_firstname,
    emp_lastname,
    phone,
    email,
    salary,
    address,
    province,
    country,
  ];
  db.query(sql, params_data, (error, result) => {
    if (error) {
      res.json({
        error: true,
        message: error,
      });
    } else {
      res.json({
        message: "Employee create successfully.",
        data: result,
      });
    }
  });
};
const update = (req, res) => {
  const {
    emp_id,
    emp_firstname,
    emp_lastname,
    phone,
    email,
    salary,
    address,
    province,
    country,
  } = req.body;
  var message = {};
  if (isEmptyOrNull(emp_firstname)) {
    message.emp_firstname = "first name is required.";
  }
  if (isEmptyOrNull(emp_lastname)) {
    message.emp_lastname = "last name is required.";
  }
  if (isEmptyOrNull(phone)) {
    message.phone = "phone is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var sql =
    "UPDATE tbl_employee SET emp_firstname=?, emp_lastname=?, phone=?, email=?, salary=?, address=?, province=?, country=? WHERE emp_id=?";
  var params_sql = [
    emp_firstname,
    emp_lastname,
    phone,
    email,
    salary,
    address,
    province,
    country,
    emp_id,
  ];
  db.query(sql, params_sql, (err, result) => {
    if (err) {
      res.json({
        err: true,
        message: err,
      });
    } else {
      res.json({
        message: result.affectedRows
          ? "Employee update successfully."
          : "Data not in System.",
        data: result,
      });
    }
  });
};
const remove = (req, res) => {
  var { id } = req.params;
  var sql = "DELETE FROM tbl_employee WHERE emp_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.json({
        message: err,
        err: true,
      });
    } else {
      res.json({
        message: result.affectedRows
          ? "Employee delete successfully."
          : "Employee ID Not Found!",
        data: result,
      });
    }
  });
};

module.exports = {
  getAllEmployee,
  getEmployeeById,
  create,
  update,
  remove,
};
