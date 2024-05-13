import { useEffect, useState } from "react";

export default function Protected() {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3002/api", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      localStorage.getItem("token");
      const data = await res.json();

      setAuth(data.data.user ? true : false);

      console.log(data);
    };

    fetchData();
  }, [token]);

  const handleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.target);
    localStorage.removeItem("token");
    setToken(localStorage.getItem("token"));
  };
  return (
    <>
      <div>{auth ? <h1>Welcome</h1> : <h1>Protected</h1>}</div>
      <button onClick={handleButton}>logout</button>
    </>
  );
}
