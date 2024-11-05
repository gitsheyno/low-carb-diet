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
  const { signIn } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    name: "",
  });

  //Client side validation
  const [inputIsValid, setInputIsValid] = useState<{
    usernameIsValid: boolean;
    passwordIsValid: boolean;
    nameIsValid: boolean;
  }>({ usernameIsValid: true, passwordIsValid: true, nameIsValid: true });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const res = useQuery({
    queryKey: ["signIn", userData],
    queryFn: signIn,
  });

  const handleInputValidation = (userData: {
    username: string;
    password: string;
    name: string;
  }) => {
    console.log(userData.username, userData.password);
    const userValidation = userData.username.includes("@");
    const passwordIsValid = userData.password.length > 6;
    const nameIsValid = userData.name.length > 0;

    setInputIsValid((prevData) => ({
      ...prevData,
      usernameIsValid: userValidation,
      passwordIsValid: passwordIsValid,
      nameIsValid: nameIsValid,
    }));
  };

  useEffect(() => {
    if (res?.data?.token) {
      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate(`/dashboard/${res.data?.name}`);
    }
  }, [res, navigate]);

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

  const handleBlurName = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputIsValid = e.target.value.length > 0;
    setInputIsValid((prev) => ({ ...prev, nameIsValid: inputIsValid }));
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString() ?? "def";
    const password = formData.get("password")?.toString() ?? "def";
    const name = formData.get("name")?.toString() ?? "def";

    handleInputValidation({ username, password, name });
    setUserData({
      username,
      password,
      name,
    });

    if (userRef.current && passRef.current) {
      userRef.current.value = "";
      passRef.current.value = "";
    }
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
          onBlur={handleBlurName}
          autoComplete="true"
          ref={nameRef}
          type="text"
          name="name"
          error={!inputIsValid?.nameIsValid}
          id="outlined-error"
          label="name"
        />
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
        <a href="#" className={styles.troubleLink}>
          Having trouble signing in?
        </a>
        <Button
          variant="contained"
          type="submit"
          className={styles.signInButton}
        >
          Sign in
        </Button>
        <p>
          Already have an account?
          <Link to="/login" className={styles.requestLink}>
            login
          </Link>
        </p>
      </Box>
    </div>
  );
};

export default SignIn;
