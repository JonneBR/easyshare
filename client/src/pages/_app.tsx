import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";

import theme from "../theme";

import "@fontsource/quicksand";

axios.defaults.baseURL = "http://localhost:3333/";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
