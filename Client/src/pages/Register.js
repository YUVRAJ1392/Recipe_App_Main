import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const [] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // 🔴 New: for error message

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg(""); // Clear previous error

    try {
      await axios.post("https://recipe-app-kh93.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration completed! You can now login.");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message); // API-specific error
      } else {
        setErrorMsg("Something went wrong. Please try again."); // Generic error
      }
    }
  };

  return (
    <div className="auth auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        {errorMsg && <p style={{ color: "red", fontSize: "14px" }}>{errorMsg}</p>} {/* 🟥 Show error */}

        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id="Register_Button" type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login" style={{ color: "blue" }}>Login here</Link>
        </p>
      </form>
    </div>
  );
};
