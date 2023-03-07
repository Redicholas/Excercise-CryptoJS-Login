var express = require("express");
var router = express.Router();
const fs = require("fs");
const CryptoJS = require("crypto-js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  fs.readFile("./users.json", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(JSON.parse(data));
  });
});

router.post("/login", function (req, res, next) {
  const user = {
    username: req.body.username,
    password: CryptoJS.AES.encrypt(req.body.password, "saltKey").toString(),
  };

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const users = JSON.parse(data);
    const foundUser = users.find((u) => u.username === user.username);
    if (foundUser) {
      const decryptedFoundPassword = CryptoJS.AES.decrypt(
        foundUser.password,
        "saltKey"
      ).toString(CryptoJS.enc.Utf8);

      if (req.body.password === decryptedFoundPassword) {
        res.status(200).json({
          message: "Login successful",
        });
      } else {
        res.status(401).json({
          message: "Wrong password",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  });
});

router.post("/register", function (req, res, next) {
  const newUser = {
    username: req.body.username,
    password: CryptoJS.AES.encrypt(req.body.password, "saltKey").toString(),
  };

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const users = JSON.parse(data);
    const foundUser = users.find((u) => u.username === newUser.username);
    if (foundUser) {
      res.status(409).json({
        message: "Username already taken",
      });
    } else {
      users.push(newUser);
      fs.writeFile("./users.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        res.status(201).json({
          message: "User created",
        });
      });
    }
  });
});

module.exports = router;
