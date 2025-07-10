"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Suspense>{children}</Suspense>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
