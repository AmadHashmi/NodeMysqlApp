// "use strict";
// const User = require("../models/user.model");
// exports.findAll = function (req, res) {
//   User.findAll(function (err, user) {
//     console.log("controller");
//     if (err) res.send(err);
//     console.log("res", user);
//     res.send(user);
//   });
// };
// exports.create = function (req, res) {
//   const new_user = new User(req.body);
//   //handles null error
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required field" });
//   } else {
//     User.create(new_user, function (err, user) {
//       if (err) res.send(err);
//       res.json({
//         error: false,
//         message: "User added successfully!",
//         data: user,
//       });
//     });
//   }
// };
// exports.findById = function (req, res) {
//   User.findById(req.params.id, function (err, user) {
//     if (err) res.send(err);
//     res.json(user);
//   });
// };
// exports.update = function (req, res) {
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required fields" });
//   } else {
//     // Check if the user with the given ID exists before attempting to update
//     User.findById(req.params.id, function (err, user) {
//       if (err) {
//         console.log("error occured");
//         res.status(500).send({ error: true, message: "Internal server error" });
//       } else if (!user) {
//         res.status(404).send({ error: true, message: "User not found" });
//       } else {
//         // Update the user here using the appropriate method (e.g., User.update)
//         User.update(
//           req.params.id,
//           new User(req.body),
//           function (err, updatedUser) {
//             if (err) {
//               res
//                 .status(500)
//                 .send({ error: true, message: "Failed to update user" });
//             } else {
//               res.json({ error: false, message: "User successfully updated" });
//             }
//           }
//         );
//       }
//     });
//   }
// };
// exports.delete = function (req, res) {
//   User.delete(req.params.id, function (err, user) {
//     if (err) res.send(err);
//     res.json({ error: false, message: "User successfully deleted" });
//   });
// };

const { check, validationResult } = require("express-validator");
const User = require("../models/user.model");

exports.findAll = function (req, res) {
  User.findAll(function (err, users) {
    if (err) {
      res.status(500).json({ error: true, message: "Internal server error" });
    } else {
      res.json(users);
    }
  });
};

exports.create = [
  // Data validation using express-validator
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("age").isInt({ min: 0 }).withMessage("Age must be a positive integer"),

  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const new_user = new User(req.body);
    User.create(new_user, function (err, user) {
      if (err) {
        res.status(500).json({ error: true, message: "Failed to create user" });
      } else {
        res.json({
          error: false,
          message: "User added successfully!",
          data: {
            id: user, // Assuming the `user` returned from the model is the new user's ID
            ...req.body, // Include the other fields from the request body in the response
          },
        });
      }
    });
  },
];

exports.findById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.status(500).json({ error: true, message: "Internal server error" });
    } else if (!user) {
      res.status(404).json({ error: true, message: "User not found" });
    } else {
      res.json(user);
    }
  });
};

exports.update = [
  // Data validation using express-validator
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("age").isInt({ min: 0 }).withMessage("Age must be a positive integer"),

  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findById(req.params.id, function (err, user) {
      if (err) {
        res.status(500).json({ error: true, message: "Internal server error" });
      } else if (!user) {
        res.status(404).json({ error: true, message: "User not found" });
      } else {
        User.update(
          req.params.id,
          new User(req.body),
          function (err, updatedUser) {
            if (err) {
              res
                .status(500)
                .json({ error: true, message: "Failed to update user" });
            } else {
              res.json({ error: false, message: "User successfully updated" });
            }
          }
        );
      }
    });
  },
];

exports.delete = function (req, res) {
  User.delete(req.params.id, function (err, user) {
    if (err) {
      if (err.message === "User not found") {
        res.status(404).json({ error: true, message: "User not found" });
      } else {
        res.status(500).json({ error: true, message: "Failed to delete user" });
      }
    } else {
      res.json({ error: false, message: "User successfully deleted" });
    }
  });
};
