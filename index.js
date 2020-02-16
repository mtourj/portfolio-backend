require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');

const mailer = require('./mailer');
const projects = require('./projects');
const protected = require('./util/protected');

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/send', mailer);
app.use('/projects', protected, projects);

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if(err){
    return console.log(err);
  }
  console.log("Atlas connected!");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})