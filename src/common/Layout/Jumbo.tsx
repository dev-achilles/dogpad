import React from "react";
import styles from "./Jumbo.module.css";

export function Jumbo({
  noSplash,
  children,
}: {
  noSplash?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="z-10 jumbotron relative mb-0 bg-transparent py-12 2xl:pb-40 2xl:pt-24">
      <div className="relative max-w-screen-xl mx-auto">{children}</div>
    </div>
  );
}
