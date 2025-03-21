import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import useAuth from "../utils/useAuth";
import NutritionSVG from "./Svg";
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
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex md:w-1/2 bg-green-50 flex-col items-center justify-center p-8">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Start Your Wellness Journey
          </h2>
          <p className="text-gray-600 mb-8">
            Create an account to track nutrition, set goals, and achieve your
            best health
          </p>
          <div className="w-full max-w-md mx-auto">
            <NutritionSVG />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-600 mt-2">
                Join us on your path to better health
              </p>
            </div>

            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="outlined"
              type="text"
              name="name"
              autoComplete="name"
              error={!inputIsValid.nameIsValid}
              helperText={!inputIsValid.nameIsValid ? "Name is required" : ""}
              onBlur={handleBlurName}
              inputRef={nameRef}
            />

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

            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium"
              style={{ backgroundColor: "#4caf50", textTransform: "none" }}
            >
              Sign up
            </Button>

            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Already have an account?
                <Link
                  to="/login"
                  className="text-green-600 font-medium ml-2 hover:text-green-700"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
