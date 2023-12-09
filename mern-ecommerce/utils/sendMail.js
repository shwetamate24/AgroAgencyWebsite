const { createMailTransporter } = require("./createMailTransporter");
const User = require('../models/user');
const signin = require('../controllers/auth');
// const { userById } = require("../controllers/user");

// let email =  
console.log();
module.exports.sendMail = (req, res) => {
  const transporter = createMailTransporter();

  let mailOptions = {
    from: 'shwetamatebtech@gmail.com',  //your email id
    to: 'apurvajarwal@gmail.com', //receiver email id
    subject: 'Your Fresh Harvest Order Confirmation!',
    text: 'Dear Customer,\n\n Greetings from Anvi Agro Agency, your gateway to the freshest harvest from the farm to your table! \n\n We’re happy to tell you that your order was successfully placed.'
    };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

// module.exports = { sendMail }