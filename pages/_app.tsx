import { AppProps } from "next/app";
import '../css/tailwind.css'
import Layout from "../components/Layout";
import Head from "next/head";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Layout>
          <Head>
            <title>A-Z Dawgs</title>
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
    </UserProvider>
    
  );
};

export default App;
