import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import AppRouter from "./app/AppRouter";
import "./styles/index.css";
import "./styles/product.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </BrowserRouter>
);
