/* eslint-disable strict */

'use strict';

const express = require('express');
const path = require('path');
const { app } = require('./app');
const { startApp } = require('./start');

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

startApp();
