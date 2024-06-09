import { useState, useEffect } from "react";
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

  const [query, setQuery] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    setQuery({ username, password });
  };

  useEffect(() => {
    const postData = async () => {
      try {
        console.log("he");
        const res = await fetch("http://localhost:3002/signin", {
          method: "POST",
          // body: JSON.stringify(query),
          body: JSON.stringify(query),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("status", res);
        if (res.ok) {
          console.log(res.status);
          const data = await res.json();
          // console.log("Login successful:", data);
          console.log("Hello :", data);
          // Handle success (e.g., redirect, set user state)
          handleLogin();
        } else {
          console.error("Login failed");
          // Handle failure (e.g., display error message)
        }
      } catch (error) {
        console.error("Error occurred during login:", error);
      }
    };

    if (query.username && query.password) {
      postData();
    }
  }, [query]);

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Register</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            // value={username}
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
            // value={password}
            name="password"
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
