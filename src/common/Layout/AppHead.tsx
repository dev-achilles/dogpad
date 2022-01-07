import Head from "next/head";
import { metaImg } from "./images";

const defaultTitle = "BlokPad - The Ultimate Launchpad for Bloktopians";
const defaultDesc =
  "BLOKPAD by BLOKTOPIA the first Launchpad in the Metaverse. Stake $BLOK tokens to gain access to projects.";
const defaultImg = metaImg.src;

export function AppHead({
  title = defaultTitle,
  description = defaultDesc,
  image = defaultImg,
  url = "https://trustpad.io/",
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) {
  return (
    <Head>
      <title key="title">{title}</title>

      <meta
        name="title"
        content="TrustPad - The Safest Multi-Chain IDO Launchpad"
        key="titleMeta"
      />
      <meta name="description" content={description} key="description" />

      <meta property="og:type" content="website" key="ogWeb" />
      <meta property="og:url" content={url} key="ogUrl" />
      <meta property="og:title" content={title} key="ogTitle" />
      <meta property="og:description" content={description} key="ogDesc" />
      <meta
        property="og:image"
        content={`https://trustpad.io${image}`}
        key="ogImg"
      />

      <meta
        property="twitter:card"
        content="summary_large_image"
        key="twCard"
      />
      <meta property="twitter:url" content={url} key="twUrl" />
      <meta property="twitter:title" content={title} key="twTitle" />
      <meta property="twitter:description" content={description} key="twDesc" />
      <meta
        property="twitter:image"
        content={`https://trustpad.io${image}`}
        key="twImg"
      />

      <link rel="icon" href="/favicon.jpeg" key="icon" />
      <link rel="preconnect" href="https://fonts.googleapis.com" key="apis" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="crossOrigin"
        key="fonts"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap"
        rel="stylesheet"
        key="font-rubik"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;900&display=swap"
        rel="stylesheet"
        key="font-poppins"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,900;1,500&display=swap"
        rel="stylesheet"
        key="font-poppins-italic"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap"
        rel="stylesheet"
        key="font-ubuntu"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
