import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
const queryClient = new QueryClient();
export const notificationAudio = new Audio("./assets/notif.mp3");
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={{ primaryColor: "cyan" }}>
      <Notifications />

      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools
          buttonPosition="bottom-left"
          initialIsOpen={false}
        /> */}
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);
