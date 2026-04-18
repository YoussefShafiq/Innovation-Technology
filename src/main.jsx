import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import "./i18n";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-text-secondary">Loading...</div>}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
