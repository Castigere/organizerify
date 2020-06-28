/* eslint-disable strict */

'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const { app } = require('./app');
const { startApp } = require('./start');

app.use(express.static(`${__dirname}/static`));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

startApp();
