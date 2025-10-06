import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerSW } from "virtual:pwa-register";

// ---------------------------
// Axios Global Configuration
// ---------------------------
// Development API
// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL = "https://newfoodproject1.onrender.com";
console.log(axios.defaults.baseURL,"Url");


// ---------------------------
// React Query Client Setup
// ---------------------------
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// ---------------------------
// Register PWA Service Worker
// ---------------------------
registerSW({
  onRegistered(registration) {
    console.log("Service Worker registered:", registration);
  },
  onNeedRefresh() {
    console.log("New content available, please refresh.");
  },
  onOfflineReady() {
    console.log("App ready to work offline.");
  },
});

// ---------------------------
// Render React App
// ---------------------------
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
