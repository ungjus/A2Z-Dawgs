import { AppProps } from "next/app";
import '../css/tailwind.css'
import Layout from "../components/Layout";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
        <Head>
          <link rel="icon" href="/icon.ico" sizes="any" />
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
        </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
