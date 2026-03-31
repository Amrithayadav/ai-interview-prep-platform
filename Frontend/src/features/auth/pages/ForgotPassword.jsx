import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.form.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const validateEmail = (inputEmail) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(inputEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setSuccess("OTP sent to your email");

      setTimeout(() => {
        navigate(`/reset-password?email=${email}`);
      }, 1500);

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Forgot Password</h1>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button className="button primary" disabled={loading || !email}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;