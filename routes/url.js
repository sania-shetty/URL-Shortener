const express = require('express');
const router = express.Router();

const {handelGenerateNewShortUrl, getAnalytics} = require("../controller/url");

router.post("/", handelGenerateNewShortUrl);

router.get('/analytics/:shortId',getAnalytics);
module.exports = router;