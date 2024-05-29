import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Nav from "./components/Nav.tsx";
import Home from "./routes/Home.tsx";
import Login from "./components/Login.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Protected from "./components/Protected.tsx";
import "./index.css";
import Recipes from "./routes/Recipes.tsx";
import Recipe from "./routes/Recipe.tsx";
import Signin from "./components/Signin.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="protected" element={<Protected />} />
        <Route path="signin" element={<Signin />} />
        <Route path="/Recipes/:id" element={<Recipes />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);
