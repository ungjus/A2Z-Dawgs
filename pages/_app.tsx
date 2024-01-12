import { AppProps } from "next/app";
import '../css/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  );
};

export default App;
