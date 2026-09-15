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
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../api/auth";
import AuthShell from "./AuthShell";
import Spinner from "../../../shared/components/Spinner";
import { saveAuthToken } from "../utils/authStorage";

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "14px", backgroundColor: "#fff" },
};

const LoginPage: React.FC = () => {
  const { logIn } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [inputIsValid, setInputIsValid] = useState({
    usernameIsValid: true,
    passwordIsValid: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      saveAuthToken(data.token);
      const requestedPath = (location.state as { from?: string } | null)?.from;
      navigate(requestedPath || `/dashboard/${encodeURIComponent(data.name)}`, {
        replace: true,
      });
    },
    onError: () => {
      setError("We couldn't sign you in. Check your details and try again.");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const usernameIsValid = username.includes("@");
    const passwordIsValid = password.length > 6;
    setInputIsValid({ usernameIsValid, passwordIsValid });
    if (usernameIsValid && passwordIsValid) {
      loginMutation.mutate({ username, password });
    }
  };

  if (loginMutation.isPending)
    return <Spinner fullScreen label="Signing you in" />;

  return (
    <AuthShell mode="login">
      <p className="page-eyebrow">Welcome back</p>
      <h1>Log in to Plateful</h1>
      <p className="auth-card__lede">
        Your meals, targets, and progress are right where you left them.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
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
            htmlFor="login-password"
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
            id="login-password"
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
            {!inputIsValid.passwordIsValid
              ? "Password must be longer than 6 characters"
              : ""}
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
          Log in
        </Button>
      </form>
      <p className="auth-switch">
        New to Plateful?<Link to="/signup">Create an account</Link>
      </p>
    </AuthShell>
  );
};

export default LoginPage;
