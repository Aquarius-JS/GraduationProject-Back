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

const sendEmail = async mailContent => {
  const mailOptions = {
    from: '"Aquarius" <1015772292@qq.com>',
  };
  transporter.sendMail({ ...mailOptions, ...mailContent }, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

const approveRegisterEmail = async (stuInfo, registerInfo) => {
  const mailContent = {
    subject: '车辆登记申请结果',
    to: stuInfo.email,
    html: `
      <h2>尊敬的${stuInfo.user_name}同学：您好！</h2>
      <p>您的车辆登记申请已审核<span style="color: rgb(114, 192, 64);"><strong>通过</strong></span>，具体信息如下：</p>
      <p>姓名：${stuInfo.user_name}</p>
      <p>学号：${stuInfo.stu_number}</p>
      <p>车辆类型：${registerInfo.vehicle_type === 1 ? '电动车' : '摩托车'}</p>
      <p>车牌号：${registerInfo.license_number}</p>
      <p><b>车辆申请已通过，请前往线下领取标识物</b></p>`,
  };
  sendEmail(mailContent);
};

module.exports.sendEmail = sendEmail;
exports.approveRegisterEmail = approveRegisterEmail;
