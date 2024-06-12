import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Nav from "./components/Nav.tsx";
import Login from "./components/Login.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import Home from "./routes/Home.tsx";
import "./index.css";
import Signin from "./components/Signin.tsx";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner.tsx";
const Home = lazy(() => import("./routes/Home.tsx"));
const Recipe = lazy(() => import("./routes/Recipe.tsx"));
const Recipes = lazy(() => import("./routes/Recipes.tsx"));
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="protected" element={<Protected />} /> */}
          <Route path="signin" element={<Signin />} />
          <Route path="/Recipes/:id" element={<Recipes />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  </BrowserRouter>
);
