import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Home;
