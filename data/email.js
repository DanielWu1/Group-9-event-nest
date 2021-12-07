const SENDGRID_API_KEY =
    "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";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

const msg = {
    to: "tony153265964@gmail.com",
    cc: "neeltejani125@gmail.com",
    bcc: "charansundar05@gmail.com", // Change to your recipient
    from: "eventnestcs546@gmail.com", // Change to your verified sender
    subject: "TESTING WITH sendgrid // adding neel to the gmail email trail",
    text: "EVENT NEST TESTING FOR EMAIL",
    html: "<strong>HEY GUYS! TESTING SOME EMAIL SENDING FUNCTIONALITY USING SENDGRID!</strong>",
};

// to send an email to the user

sgMail
    .send(msg)
    .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
    })
    .catch((error) => {
        console.error(error);
    });
