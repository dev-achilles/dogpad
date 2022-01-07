import React from "react";
import { DefaultNavbar, Jumbo, Layout } from "../src/common/Layout";
import { StandardCard } from "../src/common/UI";

export default function KycPending() {
  return (
    <Layout>
      <DefaultNavbar />
      <Jumbo>
        <StandardCard cardClassName="bg-opacity-75">
          <p>
            Thank you for applying for KYC. The verification takes from 10
            minutes up to 24 hours.
          </p>
          <p>
            Once it&apos;s complete, you&apos;ll be able to register for an IDO.
          </p>
        </StandardCard>
      </Jumbo>
    </Layout>
  );
}
