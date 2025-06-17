const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

const EMAIL_SENDER = 'quan.phamanh@vti.com.vn'; 
const EMAIL_RECEIVER = 'quan.phamanh@vti.com.vn';
const EMAIL_PASSWORD = 'cqnh lbme owcv tfyp';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_SENDER,
    pass: EMAIL_PASSWORD
  }
});

app.get('/track', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const mailOptions = {
    from: `"IP Logger 👀" <${EMAIL_SENDER}>`,
    to: EMAIL_RECEIVER,
    subject: '📡 IP mới vừa click link!',
    text: `IP người dùng: ${ip}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Cảm ơn bạn đã truy cập.");
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
    res.status(500).send("Có lỗi khi ghi nhận.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}/track`);
});
