// sending emails
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eventnestcs546@gmail.com',
    pass: 'eventnestCS546group9'
  }
});

// send draft for your tickets
function sendTicketEmail(toEmail, eventTitle, price, quantity){

  const sendEmail = {};

  // set toEmail
  sendEmail['toEmail'] = toEmail;

  // set subject
  sendEmail['subject'] = "Your tickets to the EVENTNEST's " + eventTitle + " are here! ";

  // set bodytext
  sendEmail['text'] = "Greetings! \n This is the ticket to your EVENTNEST's " + eventTitle + " \n Tickets permit entry of "+ quantity + " pax with a total amount paid of " + price +". ";

  triggerEmail(sendEmail);
}

// trigger email
function triggerEmail(inputObject){

  // send an email on 
  var mailOptions = {
    from: 'eventnestcs546@gmail.com',
    to: inputObject.toEmail,
    subject: inputObject.subject,
    text:  inputObject.text,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

sendTicketEmail('charansundar05@gmail.com', "Lobster Event", 100, 10);

module.exports = {
  sendTicketEmail
}