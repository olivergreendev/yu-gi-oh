const express = require('express');
let indexRouter = require('../routes/index/index');
let cardsRouter = require('../routes/index/cards');

module.exports = function(app) {
    app.use(express.json());

    app.use("/", indexRouter);
    app.use("/cards", cardsRouter);
};