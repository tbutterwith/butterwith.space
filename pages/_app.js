import Head from "next/head";
import HeaderLinks from "../components/header-links";
import "../styles/globals.css";

export default function AppOverride({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tom Butterwith - butterwith.space</title>
      </Head>
      <div className="px-10 py-10">
        <HeaderLinks />
        <Component {...pageProps} />
      </div>
    </>
  );
}
