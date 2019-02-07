var nodemailer = require('nodemailer');
const fs = require('fs');
var sendTo, contents, pass = "";

exports.mail = function sendMail(contents, sendTo) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodemailserver@gmail.com',
      pass: pass
    }
  });

  var mailOptions = {
    from: 'nodemailserver@gmail.com',
    to: String(sendTo),
    subject: 'R3M1ND (Automated)',
    text: String(contents)
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log("Email Reminder!")
      }
    });
}
