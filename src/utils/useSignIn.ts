import { QueryFunction } from "@tanstack/react-query";
import { json } from "react-router-dom";

type UserInfo = {
  username: string;
  name: string;
  token: string;
  message?: string;
};

const createUser: QueryFunction<
  UserInfo,
  ["signIn", { username: string; password: string; name: string }]
> = async ({ queryKey }) => {
  const { username, password, name } = queryKey[1];
  if (!username.length && !password.length) {
    return {};
  }
  console.log(queryKey);

  try {
    const res = await fetch(`https://low-carb-server.onrender.com/signin`, {
      method: "POST",
      body: JSON.stringify({ username, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await res.json();

    if (!res.ok) {
      throw new Error(jsonResponse.message);
    }

    console.log("wha is the data", jsonResponse);
    return jsonResponse.data; // Access the recipe array inside data
  } catch (err) {
    return err;
  }
};

export default createUser;
