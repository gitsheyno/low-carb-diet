import { apiFetch } from "../../../shared/api/apiFetch";

const API_URL = "https://low-carb-server.onrender.com";

export type UserInfo = {
  username: string;
  name: string;
  profileConfigured: boolean;
};

export type AuthCredentials = { username: string; password: string };
export type SignUpCredentials = AuthCredentials & { name: string };

export const signUp = async ({
  username,
  password,
  name,
}: SignUpCredentials): Promise<UserInfo> => {
  const res = await fetch(`${API_URL}/signin`, {
    method: "POST",
    body: JSON.stringify({ username, password, name }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await res.json();

  if (!res.ok) {
    throw new Error("signin failed");
  }

  return { ...jsonResponse.data, profileConfigured: false };
};

export const logIn = async ({
  username,
  password,
}: AuthCredentials): Promise<UserInfo> => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await res.json();

  if (!res.ok) {
    const errorMessage = jsonResponse.data;
    throw new Error(errorMessage);
  }

  const user = jsonResponse.data;
  let profileConfigured = false;
  try {
    const session = await getCurrentSession();
    profileConfigured = session.profileConfigured;
  } catch {
    // Login still succeeded; profile data can be fetched again in the dashboard.
  }
  return { ...user, profileConfigured };
};

export async function getCurrentSession(): Promise<{
  user: UserInfo;
  profileConfigured: boolean;
}> {
  const response = await apiFetch(`${API_URL}/api/dashboard/meals`);
  if (!response.ok) throw new Error("No active session");

  const payload = await response.json();
  const data = payload?.data ?? {};
  const profileConfigured = data.status === true;
  return {
    user: {
      username: data.username ?? "",
      name: data.name ?? "",
      profileConfigured,
    },
    profileConfigured,
  };
}

export async function logOut() {
  const response = await apiFetch(`${API_URL}/logout`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Unable to log out");
}
