import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import useAuth from "../utils/useAuth";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import NutritionSVG from "./Svg";

const Login: React.FC = () => {
  const { logIn } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  // Client side validation
  const [inputIsValid, setInputIsValid] = useState<{
    usernameIsValid: boolean;
    passwordIsValid: boolean;
  }>({ usernameIsValid: true, passwordIsValid: true });

  // Server side validation
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
    <div className="flex min-h-screen w-full">
      {/* Left side with illustration */}
      <div className="hidden md:flex md:w-1/2 bg-green-50 flex-col items-center justify-center p-8">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Nourish Your Journey
          </h2>
          <p className="text-gray-600 mb-8">
            Track your calories, maintain a balanced diet, and achieve your
            health goals
          </p>
          <div className="w-full max-w-md mx-auto">
            <NutritionSVG />
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome Back!
              </h1>
              <p className="text-gray-600 mt-2">
                Sign in to continue your health journey
              </p>
            </div>

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              type="email"
              name="username"
              autoComplete="email"
              error={!inputIsValid.usernameIsValid}
              helperText={
                !inputIsValid.usernameIsValid
                  ? "Please enter a valid email"
                  : ""
              }
              onBlur={handleBlur}
              inputRef={userRef}
            />

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={!inputIsValid.passwordIsValid}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                error={!inputIsValid.passwordIsValid}
                onBlur={handleBlur2}
                inputRef={passRef}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "hide password" : "show password"
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
              {!inputIsValid.passwordIsValid && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be longer than 6 characters
                </p>
              )}
            </FormControl>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium"
              style={{ backgroundColor: "#4caf50", textTransform: "none" }}
            >
              Log in
            </Button>

            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?
                <Link
                  to="/signin"
                  className="text-green-600 font-medium ml-2 hover:text-green-700"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
