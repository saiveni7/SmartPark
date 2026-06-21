import { useState } from "react";
import "./App.css";

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log("LOGIN RESPONSE:", data);

        if (data.status === "success") {
          onLogin(data.role);
        } else {
          alert("Invalid Credentials");
        }

      });
  };

  return (
    <div className="login-bg">

      <div className="login-card">

        <h2>🔐 SmartPark Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;