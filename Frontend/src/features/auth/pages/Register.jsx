import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";
import PasswordInput from "../components/PasswordInput";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const result = await handleRegister({ username, email, password });

    if (result === true) {
      setMessage("Account created successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login", { state: { email, password } });
      }, 1500);
    } else {
      setError(result || "Registration failed");
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        {/* ✅ Success Message */}
        {message && <p className="success">{message}</p>}

        {/* ❌ Error Message */}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password (UPDATED ✅) */}
          <div className="input-group">
            <label>Password</label>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              showStrength={true}
            />
          </div>

          <button className="button primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;