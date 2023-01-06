import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister'
import {persistQueryClient} from "@tanstack/react-query-persist-client"
import "./index.css";
import { MantineProvider } from "@mantine/core";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
    },
  },
});
const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage })
persistQueryClient({
  queryClient,
  persister:localStoragePersister
})
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider>
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
