import Head from "next/head";
import Landing from "./landing";

export default function Home() {
  return (
    <>
      <Head>
        <title>WillGaurd</title>
        <meta name="description" content="WillGaurd" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </>
  );
}
