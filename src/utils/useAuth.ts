import { QueryFunction } from "@tanstack/react-query";

type UserInfo = {
  username: string;
  name: string;
  token: string;
};

const signIn: QueryFunction<
  UserInfo,
  ["signIn", { username: string; password: string; name: string }]
> = async ({ queryKey }) => {
  const { username, password, name } = queryKey[1];
  if (!username.length || !password.length) {
    return {} as UserInfo;
  }

  const res = await fetch(`https://low-carb-server.onrender.com/signin`, {
    method: "POST",
    body: JSON.stringify({ username, password, name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await res.json();

  if (!res.ok) {
    throw new Error("signin failed");
  }

  return jsonResponse.data;
};

const logIn: QueryFunction<
  UserInfo,
  ["logIn", { username: string; password: string }, string]
> = async ({ queryKey }) => {
  const { username, password } = queryKey[1];
  const token = queryKey[2];
  console.log("clicked here");
  if (!username.length || !password.length) {
    return {} as UserInfo;
  }

  const res = await fetch(`https://low-carb-server.onrender.com/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const jsonResponse = await res.json();

  if (!res.ok) {
    const errorMessage = jsonResponse.data;
    throw new Error(errorMessage);
  }

  return jsonResponse.data;
};

const useAuth = () => {
  return {
    signIn,
    logIn,
  };
};

export default useAuth;
