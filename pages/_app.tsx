import {
  FullWeb3Provider,
  LaunchpadProvider,
  useLaunchpadProvider,
  UserProvider,
  UserTierProvider,
  useWeb3Provider,
} from "@trustpad/launchpad";
import {
  enableDebug,
  setDigitSeparator,
} from "@trustpad/launchpad/dist/shared/utils";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import ReactTooltip from "react-tooltip";
import "styles/styles.scss";
import { AppHead } from "~common/Layout";
import { poolsConfig } from "~config/poolsConfig";
import { tiers } from "~config/tiers";
import { BLOK } from "~config/tokens";
import {
  chainNodes,
  chainsConfig,
  defaultChain,
  registry,
} from "~launchpadConfig";

enableDebug(process.env.NODE_ENV === "development");
setDigitSeparator(",");

const getKYCStatus = (account: string) =>
  axios
    .get("/api/kyc", {
      params: { userRef: account },
    })
    .then(({ data }) => data)
    .catch((e) => {
      console.error("KYC fail", e);
    });

function Blockpad({ Component, pageProps }) {
  const ignoreDefaultChainSwitch = Component.ignoreDefaultChainSwitch || false;

  return (
    <LaunchpadProvider
      chains={chainsConfig}
      salePools={poolsConfig}
      levels={tiers}
      defaultChain={defaultChain.symbol}
      mainToken={BLOK}
      registry={registry}
      chainNodes={chainNodes}
    >
      <FullWeb3Provider>
        <UserProvider getKYCStatus={getKYCStatus} kycCacheKeyBase="w3">
          <UserTierProvider>
            {!ignoreDefaultChainSwitch && <DefaultChainRequester />}
            <AppHead />

            <SkeletonTheme color="#495057" highlightColor="#6c757d">
              <Component {...pageProps} />
            </SkeletonTheme>

            <ReactTooltip type="light" place="bottom" />
          </UserTierProvider>
        </UserProvider>
      </FullWeb3Provider>
    </LaunchpadProvider>
  );
}

export default Blockpad;

// TODO: can handle changing for Claimer too probably
function DefaultChainRequester() {
  const { defaultChain } = useLaunchpadProvider();
  const { targetChain, connectedChain, switchToChain } = useWeb3Provider();
  const { pathname } = useRouter();

  useEffect(() => {
    if (
      targetChain.symbol !== defaultChain.symbol ||
      connectedChain.symbol !== targetChain.symbol
    ) {
      // @ts-expect-error
      switchToChain(defaultChain.symbol);
    }
  }, [
    targetChain.symbol,
    defaultChain.symbol,
    connectedChain.symbol,
    pathname,
  ]);

  return null;
}
