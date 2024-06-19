import { QueryFunction } from "@tanstack/react-query";

type UserInfo = {
  username: string;
  token: string;
};

const createUser: QueryFunction<
  UserInfo,
  ["signIn", { username: string; password: string }]
> = async ({ queryKey }) => {
  const { username, password } = queryKey[1];
  if (!username.length && !password.length) {
    return {};
  }
  console.log(queryKey);
  const res = await fetch(`http://localhost:3002/signin`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
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
