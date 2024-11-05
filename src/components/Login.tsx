import React, { useRef, useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import useAuth from "../utils/useAuth";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";

const SignIn: React.FC = () => {
  const { logIn } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  //Client side validation
  const [inputIsValid, setInputIsValid] = useState<{
    usernameIsValid: boolean;
    passwordIsValid: boolean;
  }>({ usernameIsValid: true, passwordIsValid: true });

  //Server side validation
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const token = localStorage.getItem("token");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const res = useQuery({
    queryKey: ["logIn", userData, token as string],
    queryFn: logIn,
    enabled: !!userData.username && !!userData.password, // Only fetch when userData is populated
    retry: false, // Disable automatic retries if login fails
  });

  const handleInputValidation = (userData: {
    username: string;
    password: string;
  }) => {
    console.log(userData.username, userData.password);
    const userValidation = userData.username.includes("@");
    const passwordIsValid = userData.password.length > 6;

    setInputIsValid((prevData) => ({
      ...prevData,
      usernameIsValid: userValidation,
      passwordIsValid: passwordIsValid,
    }));
  };

  useEffect(() => {
    if (res.isError && res.error) {
      setError("Login Failed");
    }
  }, [res.isError, res.error]);

  useEffect(() => {
    if (res.data?.token) {
      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate(`/dashboard/${res.data.name}`);
    }
  }, [res.data, navigate]);

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error before attempting login

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    handleInputValidation({ username, password });

    setUserData({ username, password });

    if (userRef.current && passRef.current) {
      userRef.current.value = "";
      passRef.current.value = "";
    }
  };

  if (res.isFetching) {
    return <Spinner />;
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputIsValid = e.target.value.includes("@");
    setInputIsValid((prev) => ({ ...prev, usernameIsValid: inputIsValid }));
  };

  const handleBlur2 = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputIsValid = e.target.value.length > 6;
    setInputIsValid((prev) => ({ ...prev, passwordIsValid: inputIsValid }));
  };
  return (
    <div className={styles.container}>
      <Box
        className={styles.form}
        onSubmit={handleSignIn}
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
        autoComplete="off"
      >
        <TextField
          sx={{ width: "100%", transition: "all 5000ms ease" }}
          onBlur={handleBlur}
          autoComplete="true"
          ref={userRef}
          type="email"
          name="username"
          error={!inputIsValid?.usernameIsValid}
          id="outlined-error"
          label="email"
        />
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={!inputIsValid?.passwordIsValid}
          >
            password
          </InputLabel>
          <OutlinedInput
            error={!inputIsValid?.passwordIsValid}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onBlur={handleBlur2}
            ref={passRef}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <p style={{ color: "red" }}>{error}</p>

        <Button
          variant="contained"
          type="submit"
          className={styles.signInButton}
        >
          Log in
        </Button>
        <p className="link" style={{ marginTop: "1rem" }}>
          Create an account?
          <Link to="/signin" className={styles.requestLink}>
            Register
          </Link>
        </p>
      </Box>
    </div>
  );
};

export default SignIn;
