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
  console.log(userProfile, "in fetch");

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

  console.log("wha is the data", jsonResponse);
  return jsonResponse.data.message;
};

export default fetchUser;
