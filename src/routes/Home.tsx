import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import style from "../components/Nav.module.css";
const Home = () => {
  return (
    <div>
      <Nav />
      <div className={`${style.outlet}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
