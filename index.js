const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

const port = 443;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/send', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mohammadtourjportfolio@gmail.com',
      pass: '@Tourjfolio152'
    }
  });

  if(!req.body.name) {
    return res.status(400).send('Missing a name field!');
  }
  if(!req.body.email) {
    return res.status(400).send('Missing an email field!');
  }
  if(!req.body.message) {
    return res.status(400).send('Missing a message field!');
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
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return res.sendStatus(200)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})