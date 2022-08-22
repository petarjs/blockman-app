import type { AppProps } from "next/app";
import { NearProvider } from "../context/NearContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        defaultRadius: "md",
        primaryColor: "violet",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <NearProvider>
          <Component {...pageProps} />
        </NearProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default MyApp;
