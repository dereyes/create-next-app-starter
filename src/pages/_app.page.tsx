import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { ContextProviders } from "@/components/ContextProviders";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProviders>
      <Component {...pageProps} />
    </ContextProviders>
  );
}
