const express = require('express');
const app = express();

const mongoose = require('mongoose');
const{ User, Prediction} = require{'./database.js'};


mongoose.connect('mongodb://mongo:27017/Final-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


