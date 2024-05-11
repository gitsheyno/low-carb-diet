import { useState } from "react";
import styles from "./Login.module.css"; // Import CSS module
export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
    // Reset the form fields after login attempt (optional)
    setUsername("");
    setPassword("");
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Register</h2>
      <form
        className={styles.loginForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Register
        </button>
      </form>
    </div>
  );
}
