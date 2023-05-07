var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require('fastest-validator')
const v = new Validator()
const { Users } = require("../models")


//POST
router.post("/", async (req, res, next) => {
  //validasi
  const schema = {
      username : "string",
      email: "string",
      password: "string"
  };
  const validate = v.validate(req.body, schema);
  if (validate.lenght){
      return res.status(400).json(validate);
  }
  
  // prosses create
  const user = await Users.create(req.body);
  res.json({
      status: 200,
      message: "Success Create Data",
      data: user,
  });
});

module.exports = router;
