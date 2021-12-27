const express = require('express');
let indexRouter = require('../routes/index/index');

module.exports = function(app) {
    app.use(express.json());

    app.use("/", indexRouter);
};