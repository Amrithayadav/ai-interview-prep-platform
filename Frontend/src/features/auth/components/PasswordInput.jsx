import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./passwordInput.scss";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "Enter password",
  required = true,
  showStrength = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [score, setScore] = useState(0);

  const rules = {
    length: value.length >= 6,
    uppercase: /[A-Z]/.test(value),
    number: /\d/.test(value),
  };

  useEffect(() => {
    let currentScore = 0;
    if (rules.length) currentScore++;
    if (rules.uppercase) currentScore++;
    if (rules.number) currentScore++;
    setScore(currentScore);
  }, [value]);

  return (
    <div className="password-wrapper">
      {/* Input */}
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />

      {/* 👁 + TEXT INLINE */}
      <div
        className="toggle"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
        <span className="toggle-text">
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      {/* GREEN STRENGTH BAR */}
      {showStrength && value && (
        <div className="strength-bar">
          <div
            className="strength-fill"
            style={{ width: `${(score / 3) * 100}%` }}
          ></div>
        </div>
      )}

      {/* RULES */}
      {showStrength && value && (
        <ul className="rules">
          <li className={rules.length ? "valid" : ""}>
            At least 6 characters
          </li>
          <li className={rules.uppercase ? "valid" : ""}>
            One uppercase letter
          </li>
          <li className={rules.number ? "valid" : ""}>
            One number
          </li>
        </ul>
      )}
    </div>
  );
};

export default PasswordInput;