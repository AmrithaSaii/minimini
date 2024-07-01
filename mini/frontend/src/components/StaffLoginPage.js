import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const StaffLoginPage = () => {
  const [loginType, setLoginType] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here

    axios
    .post("http://localhost:8081/stafflogin", { username, password })
    .then((res) => {
      if (res.data.success) {
        console.log("User login successful");
        alert("Login successful");
        localStorage.setItem("username", JSON.stringify(username));
        navigate("/UserPage");

        
        const storedUsername = JSON.parse(localStorage.getItem("username"));

        
        console.log(storedUsername);
      } else {
        console.log("failed");
        alert("Failed");
        setError("Invalid username or password");
      }
    })
    .catch((err) => {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    });
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>StaffID: </label><br></br>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <Link to="/">
        <button type="button">Back</button>
      </Link>
    </form>
  );

  return (
    <div className="loginpage">
      <header className="loginpage-header">
        <h1>Login</h1>
          <div>
            {renderLoginForm()}
          </div>
        
      </header>
    </div>
  );
};

export default StaffLoginPage; 