const express = require('express');
const routes = require('./routes/routes');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost:27017/muber', { useNewUrlParser: true });
}

app.use(bodyParser.json());
routes(app);

app.use((err,req,res,next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
