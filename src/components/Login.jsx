import { useState } from "react";
import CryptoJS from "crypto-js";
import FriendsList from "../pages/FriendsList";
import "../styles/Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        setMessage("✅ Login successful");
        setLoggedIn(true); // redirect to friends list
      } else {
        setMessage("❌ Invalid username or password");
      }
    } catch {
      setMessage("⚠️ Something went wrong");
    }
  };

  if (loggedIn) return <FriendsList />;

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
