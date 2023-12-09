const nodemailer = require("nodemailer");

const createMailTransporter = () => {
    var transport = nodemailer.createTransport({
      service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'shwetamatebtech@gmail.com', //your mail id
          pass: 'lkbg xnnb mcwa diwu',  //your mail password
          clientId: ' 417232299419-5vbce9qn15h14ubeftjc8a4ka0h0n6gj.apps.googleusercontent.com',
          clientSecret: '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',
          refreshToken: '1//04YUrV4DlsZGFCgYIARAAGAQSNwF-L9IrUJOQMx5qCjHWfMeOvTsS1iHnK_YmkOO-FWkJCL667XsZMxm4kp2TMayqBKP5tC67hXk'
        }
      });
    return transport;
};

module.exports = { createMailTransporter };