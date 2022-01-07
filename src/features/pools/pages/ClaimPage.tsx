import { useWeb3Provider } from "@trustpad/launchpad";
import DefaultErrorPage from "next/error";
import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { StandardCard } from "~common/UI";
import { Claimer } from "../components/Claimer";
import { PoolConfig } from "../types";

export function ClaimPage({ pool }: { pool: PoolConfig }) {
  const { connectedChain, switchToChain } = useWeb3Provider();
  const claimDistributions = (
    Array.isArray(pool.distribution) ? pool.distribution : [pool.distribution]
  ).filter((d) => d.type === "claim_us");

  const validChain = claimDistributions[0]?.network || "BSC";
  useEffect(() => {
    if (validChain) {
      // @ts-ignore
      switchToChain(validChain);
    }
  }, [validChain, switchToChain]);

  if (!claimDistributions.length) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <StandardCard>
      {connectedChain.symbol !== validChain ? (
        <Alert variant="warning">Switch to {validChain} chain.</Alert>
      ) : (
        claimDistributions.map((d, idx) => (
          <Claimer key={idx} token={pool.token} distribution={d} />
        ))
      )}
    </StandardCard>
  );
}
