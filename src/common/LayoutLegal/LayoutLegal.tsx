import Link from "next/link";
import React from "react";
import { Jumbo, Layout } from "../Layout";
import { Navbar } from "../Layout/Navbar";
import { StandardCard } from "../UI";

export function LayoutLegal({
  title,
  children,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Layout>
      <Navbar>
        <Link href="/tos">
          <a className="nav-link text-white">Terms of use</a>
        </Link>
        <Link href="/privacy">
          <a className="nav-link text-white">Privacy Policy</a>
        </Link>
      </Navbar>
      <Jumbo>
        <StandardCard>{children}</StandardCard>
      </Jumbo>
    </Layout>
  );
}
