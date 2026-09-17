import { apiFetch } from "../../../shared/api/apiFetch";

interface UserProfile {
  gender: string;
  weight: number;
  height: number;
  age: number;
  activityLevel: string;
  goal: string;
  validated: boolean;
}
const saveProfile = async (userProfile: UserProfile) => {
  const res = await apiFetch(
    `https://low-carb-server.onrender.com/api/dashboard/profile`,
    {
      method: "PATCH",
      body: JSON.stringify({ userProfile }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Unable to save profile");
  }

  const jsonResponse = await res.json();
  return jsonResponse?.data?.message;
};

export default saveProfile;
