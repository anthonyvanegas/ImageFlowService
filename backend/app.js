const express = require('express');
const app = express();
const imageRoutes = require('./routes/images');
const systemRoutes = require('./routes/system');


app.use('/api/images', imageRoutes);
app.use('/api/system', systemRoutes);

module.exports = app;
