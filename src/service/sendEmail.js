const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'QQ',
  port: 465,
  secure: true,
  auth: {
    user: '1015772292@qq.com',
    pass: 'gvzxnimskqmjbfhg',
  },
});

sendEmail = async mailContent => {
  const mailOptions = {
    from: '"Aquarius" <1015772292@qq.com>',
    to: '1015772292@qq.com',
    // subject: '邮件主题',
    // text: 'Hello world!',
    // html: '<b>Hello world!</b>',
  };
  transporter.sendMail({ ...mailOptions, ...mailContent }, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

module.exports = sendEmail;
