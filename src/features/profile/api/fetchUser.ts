import { QueryFunction } from "@tanstack/react-query";
import { apiFetch } from "../../../shared/api/apiFetch";
type User = {
  username: string;
  message: boolean;
};

const fetchUser: QueryFunction<User, ["userInfo", id: string]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  const res = await apiFetch(
    `https://low-carb-server.onrender.com/api/dashboard/${id}`,
    {
      method: "POST",
      body: JSON.stringify({ username: id }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  const jsonResponse = await res.json();
  return jsonResponse;
};

export default fetchUser;
