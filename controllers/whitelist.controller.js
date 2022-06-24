const express = require("express");
const router = express.Router();
const whiteListService = require("../services/whitelist.service");
const auth = require("_helpers/auth");
const path = require("path");
const mongoose = require("mongoose");
const static_path = path.join(__dirname, "../_helpers/_static/");

router.use(express.static(static_path));

// routes
router.post("/add", addWhiteListAddress);
router.post("/isWhiteListMember", isWhiteListAddress);
router.get("/all", getAllWhiteListAddresses);
router.post("/delete", deleteAddresses);

router.get("*", function (req, res) {
  res.sendFile(static_path + "error.html");
});

router.post("*", function (req, res) {
  res.sendFile(static_path + "error.html");
});

module.exports = router;

function addWhiteListAddress(req, res, next) {
  whiteListService
    .addWhiteListAddress(req.body.address)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
}

function isWhiteListAddress(req, res, next) {
  whiteListService
    .isAlreadyExists(req.body.address)
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => console.log(err));
}

function getAllWhiteListAddresses(req, res, next) {
  whiteListService
    .getAllWhiteListAddresses()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
}

function deleteAddresses(req, res, next) {
  whiteListService
    .deleteAddresses(req.body.addresses)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
}
