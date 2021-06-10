const express = require("express");
const UserModel = require("../models/user");
const purgeUser = require("../services/purgeUser");
const router = express.Router();

router.get("/", function (req, res) {
  UserModel.find({}).then(function (users) {
    res.json({ users: users });
  });
});

router.post("/new", function (req, res) {
  const newUser = new UserModel({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  newUser
    .save()
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      if (error.code === 11000) {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the user" });
      }
    });
});

router.delete("/delete", function (req, res) {
  purgeUser(req.body.email);
  UserModel.deleteOne({ email: req.body.email }, function (err) {
    if (err) res.status(500).json({ message: err });
    else
      res.status(201).json({
        message: `Successfully deleted user with email ${req.body.email} !`,
      });
  });
});

module.exports = router;
