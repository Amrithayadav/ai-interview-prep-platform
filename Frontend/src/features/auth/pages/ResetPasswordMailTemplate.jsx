import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.form.scss";
import PasswordInput from "../components/PasswordInput";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");



  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get("email") || "");
    setOtp(params.get("otp") || "");
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (strength === "Weak") {
      return setError("Password is too weak");
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successful! Redirecting...");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Reset Password</h1>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} readOnly />
          </div>

          <div className="input-group">
            <label>OTP</label>
            <input type="text" value={otp} readOnly />
          </div>

          <div className="input-group">
            <label>New Password</label>

            <PasswordInput
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
            />

            {/* 🔐 Strength indicator */}
            {password && (
              <p className={`strength ${strength.toLowerCase()}`}>
                Strength: {strength}
              </p>
            )}
          </div>

          <button className="button primary">Reset Password</button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
