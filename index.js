require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

const port = process.env.PORT;
const user = process.env.USER;
const pass = process.env.PASS;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/send', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass
    }
  });

  if(!req.body.name) {
    return res.status(400).json({message: 'The name field is required!'});
  }
  if(!req.body.email) {
    return res.status(400).json({message: 'The email field is required!'});
  }
  if(!req.body.message) {
    return res.status(400).json({message: 'The message field is required!'});
  }

  const mailOptions = {
    from: 'mohammadtourjportfolio@gmail.com',
    to: 'mtourjoman0@gmail.com',
    subject: 'Portfolio Message',
    text: `
    Message recieved from: ${req.body.name}
    Email: ${req.body.email}
    Company: ${req.body.company}
    Message:
    ${req.body.message}
    `
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      console.log(error);
      return res.status(500).json({message: 'There was an internal server error while trying to send this message.'})
    } else {
      console.log('Email sent: ' + info.response);
      return res.sendStatus(200)
    }
  });

  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})