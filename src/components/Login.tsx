import React, { useState, useEffect } from "react";
import styles from "./Login.module.css"; // Import CSS module

const Login: React.FC = () => {
  const [query, setQuery] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const postData = async () => {
      try {
        console.log("he");
        const res = await fetch("http://localhost:3002/login", {
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
          localStorage.setItem("token", data.data.token);
          console.log("Hello :", data);
          // Handle success (e.g., redirect, set user state)
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("cllicked");
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    setQuery({ username, password });
  };
  console.log(query);
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
