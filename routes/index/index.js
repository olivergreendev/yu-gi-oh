const express = require('express');
const https = require('https');
const router = express.Router();
// Dev Variables
 const log = console.log;

router.get("/", (req, res) => {
    res.render("index", {title: "Yu-Gi-Oh!"});
});

module.exports = router;