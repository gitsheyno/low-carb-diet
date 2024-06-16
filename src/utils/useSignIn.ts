import { QueryFunction } from "@tanstack/react-query";

type User = {
  username: string;
  password: string;
};

const createUser: QueryFunction<User, ["signIn", user: User]> = async ({
  queryKey,
}) => {
  const { username, password } = queryKey[1];
  console.log(username, password);
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

  console.log("wha is the data", jsonResponse.data.message);
  return jsonResponse.data; // Access the recipe array inside data
};

export default createUser;
