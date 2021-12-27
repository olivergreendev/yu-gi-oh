const express = require('express');
const app = express();
require("./routes/controller")(app);
const path = require('path');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
// Dev Variables
const log = console.log;

// App Configuration
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, "public", "img", "favicon.ico")));

// Spin up server
app.listen(port, () => {
    log(`Listening on port ${port}`);
});

// Handle non-documented routes (404)
app.get('*', async (req, res) => {
    res.status(404).send("Oops. Something went wrong. Status: 404.");
})

module.exports = app;