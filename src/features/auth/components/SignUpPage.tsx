import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../api/auth";
import AuthShell from "./AuthShell";
import Spinner from "../../../shared/components/Spinner";
import { saveAuthSession } from "../utils/authStorage";

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "14px", backgroundColor: "#fff" },
};

const SignUpPage: React.FC = () => {
  const { signIn } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputIsValid, setInputIsValid] = useState({
    usernameIsValid: true,
    passwordIsValid: true,
    nameIsValid: true,
  });

  const signupMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      saveAuthSession(data.token, false);
      navigate(`/dashboard/${encodeURIComponent(data.name)}`, {
        replace: true,
      });
    },
    onError: () =>
      setError("We couldn't create your account. Please try again."),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const name = formData.get("name")?.toString() ?? "";
    setError(null);
    const usernameIsValid = username.includes("@");
    const passwordIsValid = password.length > 6;
    const nameIsValid = name.trim().length > 0;
    setInputIsValid({ usernameIsValid, passwordIsValid, nameIsValid });
    if (usernameIsValid && passwordIsValid && nameIsValid) {
      signupMutation.mutate({ username, password, name: name.trim() });
    }
  };

  if (signupMutation.isPending)
    return <Spinner fullScreen label="Creating your account" />;

  return (
    <AuthShell mode="signup">
      <p className="page-eyebrow">Create your space</p>
      <h1>Start your plan</h1>
      <p className="auth-card__lede">
        A few details now, then we’ll help turn your goals into something
        practical.
      </p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <TextField
          error={!inputIsValid.nameIsValid}
          fullWidth
          helperText={!inputIsValid.nameIsValid ? "Enter your name" : " "}
          inputRef={nameRef}
          label="Your name"
          name="name"
          onBlur={(event) =>
            setInputIsValid((current) => ({
              ...current,
              nameIsValid: event.target.value.length > 0,
            }))
          }
          sx={fieldSx}
        />
        <TextField
          autoComplete="email"
          error={!inputIsValid.usernameIsValid}
          fullWidth
          helperText={
            !inputIsValid.usernameIsValid ? "Enter a valid email address" : " "
          }
          inputRef={userRef}
          label="Email address"
          name="username"
          onBlur={(event) =>
            setInputIsValid((current) => ({
              ...current,
              usernameIsValid: event.target.value.includes("@"),
            }))
          }
          sx={fieldSx}
          type="email"
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel
            error={!inputIsValid.passwordIsValid}
            htmlFor="signup-password"
          >
            Password
          </InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  edge="end"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            error={!inputIsValid.passwordIsValid}
            id="signup-password"
            inputRef={passRef}
            label="Password"
            name="password"
            onBlur={(event) =>
              setInputIsValid((current) => ({
                ...current,
                passwordIsValid: event.target.value.length > 6,
              }))
            }
            sx={{ borderRadius: "14px", backgroundColor: "#fff" }}
            type={showPassword ? "text" : "password"}
          />
          <span
            style={{
              minHeight: 23,
              padding: "4px 14px 0",
              color: "#d32f2f",
              fontSize: 12,
            }}
          >
            {!inputIsValid.passwordIsValid ? "Use at least 7 characters" : ""}
          </span>
        </FormControl>
        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}
        <Button
          className="auth-submit"
          fullWidth
          type="submit"
          variant="contained"
        >
          Create my account
        </Button>
      </form>
      <p className="auth-switch">
        Already have an account?<Link to="/login">Log in</Link>
      </p>
    </AuthShell>
  );
};

export default SignUpPage;
