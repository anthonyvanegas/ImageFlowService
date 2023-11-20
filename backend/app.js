require('dotenv').config();

const express = require('express');
const app = express();
const imageRoutes = require('./routes/images');
const systemRoutes = require('./routes/system');
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("Database connected")
    })
    .catch(() => {
        console.log("Database connection failed")
});

app.use('/api/images', imageRoutes);
app.use('/api/system', systemRoutes);

module.exports = app;
