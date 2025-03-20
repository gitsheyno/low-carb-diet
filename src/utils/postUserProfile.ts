import { QueryFunction } from "@tanstack/react-query";

interface UserProfile {
  gender: string;
  weight: number;
  height: number;
  age: number;
  activityLevel: string;
  goal: string;
  validated: boolean;
}
type User = {
  username: string;
  message: boolean;
};

const fetchUser: QueryFunction<
  User,
  ["userProfile", UserProfile, string]
> = async ({ queryKey }) => {
  const userProfile = queryKey[1];
  const token = queryKey[2];

  if (!userProfile.validated) {
    return {};
  }
  const res = await fetch(
    `https://low-carb-server.onrender.com/api/dashboard/profile`,
    {
      method: "PATCH",
      body: JSON.stringify({ userProfile }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  const jsonResponse = await res.json();
  console.log(jsonResponse);
  return jsonResponse.data.message;
};

export default fetchUser;
