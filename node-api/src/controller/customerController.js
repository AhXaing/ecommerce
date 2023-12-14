const db = require("../util/db");
const bcrypt = require("bcrypt");
const { isEmptyOrNull, TOKEN_KEY } = require("../util/validate");
const jwt = require("jsonwebtoken");
const getCustomer = async (req, res) => {
  var sqlProvince = "SELECT * FROM tbl_province ";
  var sqlCustomer =
    "SELECT cus_id,firstname,lastname,gender,is_active,created_at FROM tbl_customer";
  var list_customer = await db.query(sqlCustomer);
  var list_province = await db.query(sqlProvince);
  res.json({
    list_customer: list_customer,
    list_province: list_province,
  });
};
const getCustomerById = (req, res) => {
  const id = req.params.id;
  var sql =
    "SELECT cus_id,firstname,lastname,gender,is_active,created_at FROM tbl_customer WHERE cus_id  = ?";
  db.query(sql, [id], (error, result) => {
    if (!error) {
      res.json({
        list: result,
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
  var {
    firstname,
    lastname,
    gender,
    username,
    password,
    is_active,
    phone,
    province_id,
    address_desc,
  } = req.body;

  var message = {};
  if (isEmptyOrNull(firstname)) {
    message.firstname = "first name is required.";
  }
  if (isEmptyOrNull(lastname)) {
    message.lastname = "last name is required.";
  }
  if (isEmptyOrNull(gender)) {
    message.gender = "gender is required.";
  }
  if (isEmptyOrNull(username)) {
    message.username = "username is required.";
  }
  if (isEmptyOrNull(password)) {
    message.password = "password is required.";
  }
  if (isEmptyOrNull(province_id)) {
    message.province_id = "provincc is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return false;
  }

  //   check user
  var sqlFind = "SELECT cus_id FROM tbl_customer WHERE username = ?";
  db.query(sqlFind, [username], (error1, result1) => {
    if (result1.length > 0) {
      res.json({
        error: true,
        message: "Account has already in record.",
      });
      return false;
    } else {
      password = bcrypt.hashSync(password, 10);
      var sql =
        "INSERT INTO tbl_customer(firstname,lastname,gender,username,password,is_active) VALUES (?,?,?,?,?,?)";
      var param_sql = [
        firstname,
        lastname,
        gender,
        username,
        password,
        is_active,
      ];
      db.query(sql, param_sql, (error2, result2) => {
        if (!error2) {
          //insert into table customer detail
          var sqlcustomerdetail =
            "INSERT INTO tbl_customer_details(cus_id,province_id,firstname,lastname,phone,address_desc) VALUES (?,?,?,?,?,?)";
          var param_cusDetail = [
            result2.insertId,
            province_id,
            firstname,
            lastname,
            phone,
            address_desc,
          ];
          db.query(sqlcustomerdetail, param_cusDetail, (error3, result3) => {
            if (!error3) {
              res.json({
                message: "Account has been created.",
                data: result3,
              });
            } else {
              res.json({
                error: true,
                message: error3,
              });
            }
          });
        } else {
          res.json({
            error: true,
            message: error2,
          });
        }
      });
    }
  });
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
  var user = await db.query("SELECT * FROM tbl_customer WHERE username=?", [
    username,
  ]);

  if (user.length > 0) {
    var passDb = user[0].password; //get password from db (sdfsd4565a!@34354)
    var isCorrect = bcrypt.compareSync(password, passDb);
    if (isCorrect) {
      var user = user[0];
      delete user.password; // delete columns password from obj user
      // var permission = await getPermissionByCustomer(user.cus_id);
      var obj = {
        user: user,
        permission: [],
        token: "", // generate token JWT
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

const update = (req, res) => {
  const { cus_id, firstname, lastname, gender, is_active } = req.body;
  var message = {};
  if (isEmptyOrNull(firstname)) {
    message.firstname = "first name is required.";
  }
  if (isEmptyOrNull(lastname)) {
    message.lastname = "last name is required.";
  }
  if (isEmptyOrNull(gender)) {
    message.gender = "gender is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      message: message,
      error: true,
    });
    return false;
  }

  var sql =
    "UPDATE tbl_customer SET firstname=?,lastname=?,gender=?,is_active=? WHERE cus_id=?";
  var param_sql = [firstname, lastname, gender, is_active, cus_id];
  db.query(sql, param_sql, (error, result) => {
    if (!error) {
      res.json({
        message: "Customer Updated.",
        list: result,
      });
    } else {
      res.json({
        message: error,
        error: true,
      });
    }
  });
};

const remove = (req, res) => {
  var sql = "DELETE FROM tbl_customer WHERE cus_id=?";
  db.query(sql, [req.params.id], (err, result) => {
    if (!err) {
      res.json({
        message: "Customer is deleted.",
        list: result,
      });
    } else {
      res.json({
        err: true,
        message: err,
      });
    }
  });
};

const getAddress = (req, res) => {
  var sql = "SELECT * FROM tbl_customer_details";
  db.query(sql, (err, result) => {
    if (!err) {
      res.json({
        data: result,
      });
    } else {
      res.json({
        error: true,
        message: err,
      });
    }
  });
};
const getAddressById = (req, res) => {
  // var { cus_id } = req.body;
  var { id } = req.params;
  var sql = "SELECT * FROM tbl_customer_details WHERE cusd_id = ?";
  db.query(sql, [id], (err, result) => {
    if (!err) {
      res.json({
        data: result,
      });
    } else {
      res.json({
        error: true,
        message: err,
      });
    }
  });
};
const newAddress = (req, res) => {
  db.beginTransaction();
  var { cus_id, province_id, firstname, lastname, phone, address_desc } =
    req.body;
  var message = {};
  if (isEmptyOrNull(firstname)) {
    message.firstname = "first name is required.";
  }
  if (isEmptyOrNull(lastname)) {
    message.lastname = "last name is required.";
  }
  if (isEmptyOrNull(province_id)) {
    message.province_id = "province is required.";
  }
  if (isEmptyOrNull(phone)) {
    message.phone = "phone is required.";
  }
  if (isEmptyOrNull(address_desc)) {
    message.address_desc = "address_desc is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      message: message,
      error: true,
    });
    return false;
  }

  var sql =
    "INSERT INTO tbl_customer_details (cus_id,province_id,firstname,lastname,phone,address_desc) VALUES (?,?,?,?,?,?)";
  var param_sql = [
    cus_id,
    province_id,
    firstname,
    lastname,
    phone,
    address_desc,
  ];
  db.query(sql, param_sql, (err, result) => {
    if (err) {
      res.json({
        error: true,
        message: err,
      });
      db.commit();
    } else {
      db.rollback();
      res.json({
        message: "Customer Details is Created.",
        data: result,
      });
    }
  });
};

const updateAddress = (req, res) => {
  var {
    cus_id,
    province_id,
    firstname,
    lastname,
    phone,
    address_desc,
    cusd_id,
  } = req.body;
  var message = {};
  if (isEmptyOrNull(cus_id)) {
    message.cus_id = "cus_id is required.";
  }
  if (isEmptyOrNull(cusd_id)) {
    message.cusd_id = "cusd_id is required.";
  }
  if (isEmptyOrNull(firstname)) {
    message.firstname = "first name is required.";
  }
  if (isEmptyOrNull(lastname)) {
    message.lastname = "last name is required.";
  }
  if (isEmptyOrNull(province_id)) {
    message.province_id = "province is required.";
  }
  if (isEmptyOrNull(phone)) {
    message.phone = "phone is required.";
  }
  if (isEmptyOrNull(address_desc)) {
    message.address_desc = "address_desc is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      message: message,
      error: true,
    });
    return false;
  }

  var sql =
    "UPDATE tbl_customer_details SET cus_id=?,province_id=?,firstname=?,lastname=?,phone=?,address_desc=? WHERE cusd_id=?";
  var param_sql = [
    cus_id,
    province_id,
    firstname,
    lastname,
    phone,
    address_desc,
    cusd_id,
  ];
  db.query(sql, param_sql, (err, result) => {
    if (err) {
      res.json({
        error: true,
        message: err,
      });
    } else {
      res.json({
        message: "Customer Details is Updated.",
        data: result,
      });
    }
  });
};
const removeAddress = (req, res) => {
  var { id } = req.params;
  var sql = "DELETE FROM tbl_customer_details WHERE cusd_id = ?";
  db.query(sql, [id], (err, result) => {
    if (!err) {
      res.json({
        message: result.affectedRows
          ? "Remove Success."
          : "Not found in system.",
        data: result,
      });
    } else {
      res.json({
        error: true,
        message: err,
      });
    }
  });
};

module.exports = {
  getCustomer,
  getCustomerById,
  create,
  update,
  remove,
  getAddress,
  getAddressById,
  newAddress,
  updateAddress,
  removeAddress,
  login,
};
