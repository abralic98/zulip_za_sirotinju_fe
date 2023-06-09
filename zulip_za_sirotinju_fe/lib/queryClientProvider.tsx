"use client";
import { Inactivity } from "@/components/Inactivity";
import { useInactive } from "@/hooks/useInactive";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 300000,
      retry: 0,
    },
  },
});
export const QueryClientProviderA = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Inactivity />
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
};
