import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.form.scss";
import PasswordInput from "../components/PasswordInput";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    const otpParam = params.get("otp");

    if (!emailParam) {
      setError("Invalid password reset link. Please request a new one.");
      setTimeout(() => navigate("/forgot-password"), 2000);
    }

    setEmail(emailParam || "");
    setOtp(otpParam || "");
  }, [navigate]);

  // 🔐 Password strength
  const validatePasswordStrength = (val) => {
    if (val.length < 8) return "Weak";
    if (!/[A-Z]/.test(val)) return "Weak";
    if (!/[0-9]/.test(val)) return "Weak";
    if (!/[!@#$%^&*]/.test(val)) return "Medium";
    return "Strong";
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
    setStrength(validatePasswordStrength(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp) {
      return setError("Invalid OTP. Please request a new password reset link.");
    }

    if (strength === "Weak") {
      return setError(
        "Password must be at least 8 characters with uppercase, number, and special character"
      );
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:3000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successful! Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Reset Password</h1>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} readOnly disabled />
          </div>

          {/* OTP */}
          <div className="input-group">
            <label>OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP from email"
              disabled={loading}
            />
          </div>

          {/* New Password */}
          <div className="input-group">
            <label>New Password</label>

            <PasswordInput
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)} // ✅ FIXED
              placeholder="Enter new password (min 8 chars)"
              disabled={loading}
            />

            {password && (
              <p className={`strength ${strength.toLowerCase()}`}>
                Strength: {strength}
              </p>
            )}

            <p style={{ fontSize: "0.8125rem", color: "#7d8590", marginTop: "8px" }}>
              Password must contain: uppercase letter, number, and special character (!@#$%^&*)
            </p>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm Password</label>

            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // ✅ FIXED
              placeholder="Confirm new password"
              disabled={loading}
            />

            {confirmPassword && password !== confirmPassword && (
              <p style={{ color: "#ff4d4d", fontSize: "0.8125rem", marginTop: "5px" }}>
                ❌ Passwords do not match
              </p>
            )}

            {confirmPassword && password === confirmPassword && (
              <p style={{ color: "#3fb950", fontSize: "0.8125rem", marginTop: "5px" }}>
                ✓ Passwords match
              </p>
            )}
          </div>

          {/* Button */}
          <button
            className="button primary"
            disabled={
              loading ||
              !otp ||
              strength === "Weak" ||
              password !== confirmPassword
            }
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;