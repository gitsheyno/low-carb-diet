import React, { useRef, useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useQuery } from "@tanstack/react-query";
import useLogin from "../utils/useLogin";

const SignIn: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const token = localStorage.getItem("token");
  const res = useQuery({
    queryKey: ["logIn", userData, token as string],
    queryFn: useLogin,
  });

  if (res?.data?.token) {
    const { token } = res.data;
    console.log("token", token);
    localStorage.setItem("token", token);
  }

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString() ?? "def";
    const password = formData.get("password")?.toString() ?? "def";

    console.log(username, password);
    setUserData({
      username,
      password,
    });

    if (userRef.current && passRef.current) {
      userRef.current.value = "";
      passRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignIn} className={styles.form}>
        <h2>Agent Login</h2>
        <p>Hey, Enter your details to get sign in to your account</p>
        <input
          ref={userRef}
          type="email"
          name="username"
          placeholder="Enter Email / Phone No"
          required
          className={styles.input}
        />
        <input
          ref={passRef}
          type="password"
          placeholder="Passcode"
          name="password"
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          className={styles.input}
        />
        <a href="#" className={styles.troubleLink}>
          Having trouble in sign in?
        </a>
        <button type="submit" className={styles.signInButton}>
          Sign in
        </button>
        <p>Or Sign in with</p>
        <div className={styles.socialButtons}>
          <button className={styles.socialButton}>Google</button>
          <button className={styles.socialButton}>Apple ID</button>
          <button className={styles.socialButton}>Facebook</button>
        </div>
        <p>
          Have you already an account?
          <a href="#" className={styles.requestLink}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
