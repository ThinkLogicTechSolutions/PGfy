const express = require('express');
const { } = require('../controller/Admin');
const router = express.Router();
const { auth,isAdmin } = require("../middlewares/auth");


module.exports = router;
