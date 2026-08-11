import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import App from "./App";
import Spinner from "./components/Spinner";

const Login = lazy(() => import("./components/Login"));
const SignIn = lazy(() => import("./components/Signin"));
const MainDashboard = lazy(() => import("./routes/dashboard/MainDashboard"));
const Home = lazy(() => import("./routes/dashboard/Home"));
const Recipe = lazy(() => import("./routes/Recipe"));
const Profile = lazy(() => import("./routes/dashboard/ProfilePage"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const MealPlanner = lazy(() => import("./routes/dashboard/MealPlanner"));

export default function AppRouter() {
  return (
    <Suspense fallback={<Spinner fullScreen label="Opening Plateful" />}>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="signup" element={<SignIn />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<MainDashboard />}>
          <Route path=":user/Recipes" element={<Home />} />
          <Route path=":user/recipe/:id" element={<Recipe />} />
          <Route path=":user" element={<Dashboard />} />
          <Route path=":user/planning" element={<MealPlanner />} />
          <Route path=":user/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
