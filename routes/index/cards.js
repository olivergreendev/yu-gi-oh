const express = require('express');
const router = express.Router();
// Dev Variables
const log = console.log;

// router.get("/cardname", (req, res) => {
//     res.render("cards", {title: "Blue-Eyes White Dragon | Yu-Gi-Oh!"});
// });
router.get("/:name", (req, res) => {
    let cardName = req.params.name;
    let data = {name: cardName};
    res.render("cards", {title: `${data.name} | Yu-Gi-Oh!`, data: data});
});

module.exports = router;