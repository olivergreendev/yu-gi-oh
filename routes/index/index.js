const express = require('express');
const https = require('https');
const router = express.Router();
// Dev Variables
 const log = console.log;

let cards = [];
let hasCardsLoaded = false;
router.get("/", (req, res) => {
    res.render("index", {title: "Yu-Gi-Oh!", data: cards});
});

function getCardData(query) {
    let cardImages = [];
    https.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${query}&desc=${query}`, (response) => {
        let data = "";
        response.on("data", chunk => {
            data += chunk;
        });
        response.on("end", () => {
            let url = JSON.parse(data);
            if (url.data) {
                for (let i = 0; i < url.data.length; i++) {
                    cardImages.push(url.data[i].card_images[0].image_url_small);
                }
            }
            cards = cardImages;
            hasCardsLoaded = true;
        });
    }).on("error", (error) => {
        log("Error: " + error.message);
    });
}

module.exports = router;