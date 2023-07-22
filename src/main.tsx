import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { GeneralDataProvider } from "./store/GeneralContext";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GeneralDataProvider>
          <App />
        </GeneralDataProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
