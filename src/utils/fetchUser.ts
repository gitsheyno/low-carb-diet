import { QueryFunction } from "@tanstack/react-query";
type User = {
  username: string;
  message: boolean;
};

const fetchUser: QueryFunction<
  User,
  ["userInfo", token: string, id: string]
> = async ({ queryKey }) => {
  const token = queryKey[1];
  const id = queryKey[2];
  console.log(id, "in fetch");
  const res = await fetch(`http://localhost:3002/api/dashboard/${id}`, {
    method: "POST",
    body: JSON.stringify({ username: id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  const jsonResponse = await res.json();

  console.log("wha is the data", jsonResponse);
  return jsonResponse; // Access the recipe array inside data
};

export default fetchUser;
