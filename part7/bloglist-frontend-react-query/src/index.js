import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationContextProvider } from "./NotifContext";
import { LoginContextProvider } from "./LoginContext";

const queryClient = new QueryClient();

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginContextProvider>
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationContextProvider>
  </LoginContextProvider>
);
