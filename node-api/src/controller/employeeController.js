const db = require("../util/db");
const { isEmptyOrNull, TOKEN_KEY } = require("../util/validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getPermissionByUser } = require("./AuthController");

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
    username,
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

const setPassword = async (req, res) => {
  const { username, password } = req.body;
  var message = {};
  if (isEmptyOrNull(username)) {
    message.username = "username is required.";
  }
  if (isEmptyOrNull(password)) {
    message.password = "password is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      message: message,
    });
    return false;
  }

  var employee = await db.query("SELECT * FROM tbl_employee WHERE phone=?", [
    username,
  ]);

  if (employee.length > 0) {
    var passwordGenerate = bcrypt.hashSync(password, 10);
    var update = await db.query(
      "UPDATE tbl_employee SET password=? WHERE phone=?",
      [passwordGenerate, username]
    );
    res.json({
      message: "password is updated",
      list: update,
    });
  } else {
    res.json({
      message: "invalide password",
      error: true,
    });
  }
};
const login = async (req, res) => {
  var { username, password } = req.body;
  var message = {};
  if (isEmptyOrNull(username)) {
    message.username = "Please fill in username";
  }
  if (isEmptyOrNull(password)) {
    message.password = "Please fill in password";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return;
  }
  var user = await db.query("SELECT * FROM tbl_employee WHERE phone=?", [
    username,
  ]);

  if (user.length > 0) {
    var passDb = user[0].password; //get password from db (sdfsd4565a!@34354)
    var isCorrect = bcrypt.compareSync(password, passDb);
    if (isCorrect) {
      var user = user[0];
      delete user.password; // delete columns password from obj user
      var permission = await getPermissionByUser(user.emp_id);
      var obj = {
        user: user,
        permission: permission,
      };
      var access_token = jwt.sign({ data: { ...obj } }, TOKEN_KEY, {
        expiresIn: "1h",
      });
      // var refresh_token = jwt.sign({ data: { ...obj } }, TOKEN_KEY,{expiresIn:"30s"});
      var access_token = jwt.sign({ data: { ...obj } }, TOKEN_KEY);
      res.json({
        ...obj,
        access_token: access_token,
      });
    } else {
      res.json({
        message: "password incorrect!",
        error: true,
      });
    }
  } else {
    res.json({
      message: "Account doesn't have!, Please goto register.",
      error: true,
    });
  }
};

module.exports = {
  getAllEmployee,
  getEmployeeById,
  create,
  update,
  remove,
  setPassword,
  login,
};
