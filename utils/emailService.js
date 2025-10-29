import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendWelcomeEmail = async (employeeEmail, employeeName) => {
  try {
    // 1️⃣ Setup the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2️⃣ Define the email options
  
    const mailOptions = {
      from: `"ToysHub Admin" <${process.env.EMAIL_USER}>`,
      to: employeeEmail,
      subject: "🎉 Welcome to ToysHub!",
      html: `
        <div style="background-color:#f5f7fa; padding:40px 0; font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.08); overflow:hidden;">
            <tr>
              <td style="background-color:#0d9488; padding:20px; text-align:center; color:#fff;">
                <h1 style="margin:0; font-size:26px;">🤖 ToysHub</h1>
                <p style="margin:4px 0 0;">Welcome to the Family!</p>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 30px;">
                <h2 style="color:#333; font-size:22px;">Hello ${employeeName},</h2>
                <p style="color:#555; line-height:1.6; font-size:16px;">
                  We’re thrilled to welcome you to the <strong>ToysHub</strong> team! 🎉  
                  Your account has been successfully created by our admin.
                </p>
                <div style="margin:25px 0; text-align:center;">
                  <a href="https://your-toyshub-domain.com/login"
                     style="background-color:#0d9488; color:#fff; padding:12px 28px; text-decoration:none; border-radius:6px; font-weight:600; display:inline-block;">
                    Login to Your Account
                  </a>
                </div>
                <p style="color:#666; line-height:1.5;">
                  You can now sign in using your registered email and password.
                  <br/><br/>
                  We're excited to see your contributions and growth here at ToysHub.
                </p>
                <p style="margin-top:30px; color:#333; font-weight:500;">Warm regards,</p>
                <p style="margin:0; color:#0d9488; font-weight:bold;">ToysHub Admin Team</p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f0fdfa; padding:20px; text-align:center; color:#666; font-size:13px;">
                <p style="margin:0;">&copy; ${new Date().getFullYear()} ToysHub Pvt. Ltd. All rights reserved.</p>
                <p style="margin-top:5px;">
                  <a href="https://your-toyshub-domain.com" style="color:#0d9488; text-decoration:none;">Visit Website</a> |
                  <a href="mailto:support@toyshub.com" style="color:#0d9488; text-decoration:none;">Contact Support</a>
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    };


    // 3️⃣ Send the email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${employeeEmail}`);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};
