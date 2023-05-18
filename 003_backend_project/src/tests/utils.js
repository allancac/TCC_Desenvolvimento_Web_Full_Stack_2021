const express = require('express');
const app = express();
const motoristaRoutes = require('../routes/motoristaRoutes');

app.use(express.json());
app.use('/api', motoristaRoutes);

module.exports = app;