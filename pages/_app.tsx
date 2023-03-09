import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import { AuthGuard } from "../components/AuthGuard";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        {pageProps.protected ? (
          <AuthGuard>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthGuard>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthProvider>
    </>
  );
}
