import { useState } from "react";
import CryptoJS from "crypto-js";
import FriendsList from "../pages/FriendsList";
import "../styles/Login.scss";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaMoon, FaSun } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://randomuser.me/api/?seed=lll");
      const data = await res.json();
      const user = data.results[0];
      const apiUsername = user.login.username;
      const apiPassword = user.login.password;

      const hashedInput = CryptoJS.SHA256(password).toString();
      const hashedApi = CryptoJS.SHA256(apiPassword).toString();

      if (username === apiUsername && hashedInput === hashedApi) {
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => setLoggedIn(true), 800); // small delay for UX
      } else {
        setMessage("❌ Invalid username or password");
      }
    } catch {
      setMessage("⚠️ Something went wrong");
    }
  };

  if (loggedIn) return <FriendsList />;

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <p className="subtext">Please login to continue</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {/* <span className="focus-border"></span> */}
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {/* <span className="focus-border"></span> */}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
