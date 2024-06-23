import { QueryFunction } from "@tanstack/react-query";

type UserInfo = {
  username: string;
  name: string;
  token: string;
};

const createUser: QueryFunction<
  UserInfo,
  ["logIn", { username: string; password: string }, token: string]
> = async ({ queryKey }) => {
  const { username, password } = queryKey[1];
  const token = queryKey[2];

  if (!username.length && !password.length) {
    return {};
  }
  console.log(queryKey);
  const res = await fetch(`http://localhost:3002/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  const jsonResponse = await res.json();

  console.log("wha is the data", jsonResponse.data);
  return jsonResponse.data; // Access the recipe array inside data
};

export default createUser;
