import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Set Axios base URL
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
console.log(axios.defaults.baseURL,"axios");


axios.defaults.baseURL = "http://localhost:4000";

// Create React Query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
