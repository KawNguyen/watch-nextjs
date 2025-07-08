"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
import { AuthProvider } from "./auth-context";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NuqsAdapter>
          <Suspense>{children}</Suspense>
        </NuqsAdapter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
