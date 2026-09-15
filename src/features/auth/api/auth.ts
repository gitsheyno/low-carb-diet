type UserInfo = {
  username: string;
  name: string;
  token: string;
};

const signIn = async ({
  username,
  password,
  name,
}: {
  username: string;
  password: string;
  name: string;
}): Promise<UserInfo> => {
  const res = await fetch(`https://low-carb-server.onrender.com/signin`, {
    method: "POST",
    body: JSON.stringify({ username, password, name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await res.json();

  if (!res.ok) {
    throw new Error("signin failed");
  }

  return jsonResponse.data;
};

const logIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<UserInfo> => {
  const res = await fetch(`https://low-carb-server.onrender.com/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await res.json();

  if (!res.ok) {
    const errorMessage = jsonResponse.data;
    throw new Error(errorMessage);
  }

  return jsonResponse.data;
};

const useAuth = () => {
  return {
    signIn,
    logIn,
  };
};

export default useAuth;
