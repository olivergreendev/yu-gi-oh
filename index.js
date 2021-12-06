const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
// Base root
app.get('/', (req, res) => {
    res.render("index", {title: "Index"});
});
app.get('*', (req, res) => {
    res.status(404).send("Oops. Something went wrong. Status: 404.");
})
// App Configuration
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// Spin up server
app.listen(port, () => {
    console.log(`Successfully booted up on port ${port}`);
});