const express = require('express');
const router = express.Router();
const {createProfile} = require("../controller/Profile");
const { getAllPGs, viewPG, getPGsByCity } = require('../controller/Tenant');
const { auth } = require('../middlewares/auth');

router.post('/create-profile',auth,createProfile);
router.get("/getAllPGs",getAllPGs);
router.post("/viewPG",viewPG);
router.get("/getPGsByCity",getPGsByCity);

module.exports = router;
