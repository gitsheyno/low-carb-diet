import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Nav from "./components/Nav.tsx";
import Login from "./components/Login.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MealPlanner from "./routes/dashboard/MealPlanner.tsx";
import "./index.css";
import SignIn from "./components/Signin.tsx";
import MainDashboard from "./routes/dashboard/MainDashboard.tsx";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner.tsx";
const Home = lazy(() => import("./routes/Home.tsx"));
const Recipe = lazy(() => import("./routes/Recipe.tsx"));
// const Recipes = lazy(() => import("./routes/Recipes.tsx"));
import Container from "./components/custom/Container.tsx";
const Dashboard = lazy(() => import("./components/Dashboard.tsx"));
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      {/* <Nav /> */}
      <Container>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route index path="/" element={<SignIn />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="login" element={<Login />} />
          </Routes>
          <Container>
            <Routes>
              <Route path="/dashboard" element={<MainDashboard />}>
                <Route path=":user/Recipes" element={<Home />} />
                <Route path=":user/recipe/:id" element={<Recipe />} />
                <Route path=":user" element={<Dashboard />} />
                <Route path=":user/planing" element={<MealPlanner />} />
              </Route>
            </Routes>
          </Container>
        </Suspense>
      </Container>
    </QueryClientProvider>
  </BrowserRouter>
);
