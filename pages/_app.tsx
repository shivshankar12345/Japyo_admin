import "../styles/globals.css";
import "../styles/react-datepicker.css";

import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <NextNProgress
          color="#e74694"
          startPosition={0.3}
          stopDelayMs={300}
          height={5}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default MyApp;
