import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // 🔴 Error feedback state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg(""); // Clear previous error

    try {
      const result = await axios.post("https://recipe-app-main-r4yh.onrender.com/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message); // Server-sent message
      } else {
        setErrorMsg("Login failed. Please check your credentials."); // Fallback
      }
    }
  };

  return (
    <div className="auth auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {errorMsg && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
            {errorMsg}
          </p>
        )}

        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id="Login_Button" type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "blue" }}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};
