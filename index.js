require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require('@sendgrid/mail');
const cors = require("cors");

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  
  try {

    if(!req.body.name) {
      return res.status(400).json({message: 'The name field is required!'});
    }
    if(!req.body.email) {
      return res.status(400).json({message: 'The email field is required!'});
    }
    if(!req.body.message) {
      return res.status(400).json({message: 'The message field is required!'});
    }
    sgMail.setApiKey(process.env.API_KEY);
    const msg = {
      to: process.env.RECIPIENT,
      from: `Portfolio Website <${req.body.email}>`,
      subject: 'Portfolio Message',
      html: `
      <strong>Name: </strong> ${req.body.name}<br>
      <strong>Email: </strong> ${req.body.email}<br>
      <strong>Company: </strong> ${req.body.company}<br>
      <strong>Message:</strong><br>
      ${req.body.message}
      `,
    };
    await sgMail.send(msg);
  
    return res.sendStatus(200);
  } catch (err) {
    console.log(req.body);
    return res.status(500).json({message: err.message});
  }
  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})