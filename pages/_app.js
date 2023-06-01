import Head from "next/head";
import HeaderLinks from "../components/header-links";
import "../styles/globals.css";

export default function AppOverride({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tom Butterwith - butterwith.space</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/icons/favicon-16x16.png"
        />
      </Head>
      <div className="px-10 py-10">
        <HeaderLinks />
        <Component {...pageProps} />
      </div>
    </>
  );
}
