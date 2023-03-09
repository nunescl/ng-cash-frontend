import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: any) {
  const { children } = props;
  return (
    <>
      <Head>
        <title>NG.CASH</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen relative text-white">
        <Header />
        <main className="flex-1 flex-column">{children}</main>
        <Footer />
      </div>
    </>
  );
}
