const express = require ("express");
const router = express.Router();
const {handelUserSignup, handelUserLogin} = require('../controller/user');
router.post("/", handelUserSignup );
router.post("/login", handelUserLogin );
module.exports = router;