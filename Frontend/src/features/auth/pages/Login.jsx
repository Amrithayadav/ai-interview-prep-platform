import React, { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PasswordInput from "../components/PasswordInput";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const [email, setemail] = useState(location.state?.email || "");
  const [password, setpassword] = useState(location.state?.password || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const res = await handleLogin({ email, password });

    if (res.success) {
      navigate("/home");
    } else {
      setError(res.message);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading......</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        {/* 🔥 ERROR MESSAGE */}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <PasswordInput
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              showStrength={true}
            />

            {/* Forgot Password */}
            <div className="forgot-container">
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Button */}
          <button className="button primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;