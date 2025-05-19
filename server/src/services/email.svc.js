const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS
  },
  // Add timeout and pooling options for better reliability
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 5
});


const ConfirmPayment = async (userEmail, userName, amount, transactionId) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: userEmail, // dynamic user's email
      subject: '🧾 Payment Confirmation - Thank You for Your Purchase!',
      html: `
    <div style="font-family: 'Segoe UI', sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; padding: 24px; border-radius: 8px;">
      <h2 style="color: #0d6efd;">Payment Successful ✅</h2>
      <p>Hi <strong>${userName}</strong>,</p>
      <p>Thank you for your payment. We're happy to confirm that we’ve received your payment successfully.</p>

      <hr style="margin: 20px 0;" />

      <h3 style="margin-bottom: 8px;">💳 Payment Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td><strong>Amount:</strong></td>
          <td>₹${amount}</td>
        </tr>
        <tr>
          <td><strong>Transaction ID:</strong></td>
          <td>${transactionId}</td>
        </tr>
        <tr>
          <td><strong>Date:</strong></td>
          <td>${new Date().toLocaleString()}</td>
        </tr>
      </table>

      <hr style="margin: 20px 0;" />

      <p>If you have any questions or didn’t authorize this payment, please contact our support team immediately.</p>

      <a href="mailto:support@apnewalecoders.com" style="display: inline-block; margin-top: 16px; padding: 10px 20px; background-color: #0d6efd; color: white; border-radius: 4px; text-decoration: none;">Contact Support</a>

      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        Regards,<br />
        ApneWaleCoders
      </p>
    </div>
  `
    };
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log({ message: 'error while sending email' })
  }
}



// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

module.exports = { ConfirmPayment };