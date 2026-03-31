const resetPasswordTemplate = (otp, resetLink) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
      
      <h2 style="text-align: center; color: #333;">🔐 Password Reset</h2>

      <p style="font-size: 14px; color: #555;">
        We received a request to reset your password.
      </p>

      <p style="font-size: 14px; color: #555;">
        Use the OTP below to reset your password:
      </p>

      <h1 style="text-align: center; letter-spacing: 5px; color: #000;">
        ${otp}
      </h1>

      <p style="text-align: center; font-size: 13px; color: #888;">
        This OTP is valid for 5 minutes.
      </p>

      <hr style="margin: 20px 0;" />

      <p style="text-align: center; font-size: 14px;">
        Or click the button below:
      </p>

      <div style="text-align: center; margin-top: 20px;">
        <a href="${resetLink}" 
           style="background-color: black; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           Reset Password
        </a>
      </div>

      <p style="margin-top: 30px; font-size: 12px; color: #aaa; text-align: center;">
        If you didn’t request this, you can ignore this email.
      </p>

    </div>
  </div>
  `;
};

module.exports = resetPasswordTemplate;