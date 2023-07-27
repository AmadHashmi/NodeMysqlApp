"use strict";
var dbConn = require("./../../config/db.config");
//User object create
var User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.age = user.age;
};
User.create = function (newUsr, result) {
  dbConn.query("INSERT INTO users set ?", newUsr, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
User.findById = function (id, result) {
  dbConn.query("Select * from users where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      if (res.length === 0) {
        console.log("User not found");
        result(err, null);
      } else {
        result(null, res);
      }
    }
  });
};
User.findAll = function (result) {
  dbConn.query("Select * from users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("users : ", res);
      result(null, res);
    }
  });
};
User.update = function (id, user, result) {
  dbConn.query(
    "UPDATE users SET name=?, email=?,age=? WHERE id = ?",
    [user.name, user.email, user.age, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
User.delete = function (id, result) {
  dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      // Checking if the delete operation affected any rows
      if (res.affectedRows === 0) {
        // No rows were deleted, which means the user doesn't exist
        result({ message: "User not found" }, null);
      } else {
        // Rows were deleted successfully
        result(null, res);
      }
    }
  });
};

module.exports = User;
