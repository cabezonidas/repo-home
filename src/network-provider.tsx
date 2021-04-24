import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const retry = (maxTries: number = 0) => (count: number, err: any = {}) => {
  if (!err.silent) {
    // TODO: Report error.
  } else {
    return false;
  }
  return count < Math.max(maxTries, 0);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: retry() },
    mutations: { retry: retry() },
  },
});

export const NetworkProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
};
