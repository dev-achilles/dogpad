import type { AdminRootProps } from "@trustpad/admin/dist/interface";
import { useLaunchpadProvider } from "@trustpad/launchpad";
import axios from "axios";
import dynamic from "next/dynamic";
import React from "react";
import { DefaultNavbar, Jumbo, Layout } from "~common/Layout";

const AdminRoot = dynamic<AdminRootProps>(
  // @ts-ignore
  () => import("@trustpad/admin").then((mod) => mod.AdminRoot),
  { ssr: false }
);

const ADMINS = (process.env.NEXT_PUBLIC_ADMIN_ADDRESSES || "")
  .split(",")
  .map((a) => a.toLowerCase());

const IDO_ADMINS = [
  "0xa03f03170CD2F86239ea9fc57A0276573c2A708D",
  "0x9132720b483AC90b2944be4c6b26CEBbc1Db3ff4",
];

const getSolanaWallets = (addresses: string[]) =>
  axios.post("/api/collect-wallets", { addresses }).then(({ data }) => {
    console.log("not found SOL wallets", data.notFound);
    return data.wallets;
  });

export default function Secrethouse() {
  const { salePools, levels } = useLaunchpadProvider();

  return (
    <Layout>
      <DefaultNavbar />
      <Jumbo>
        <AdminRoot
          alwaysWhitelist={{
            CM: [],
            influencers: [],
          }}
          login={{
            requireSigning: process.env.NODE_ENV === "production",
            addresses: ADMINS,
          }}
          getSolanaWallets={getSolanaWallets}
          getPoolUrl={(id) => `/pool/${id}`}
          poolsConfig={salePools}
          levels={levels}
          deployIDOConfig={{
            registrationCloseHours: 6,
            registrationStartHours: 48,
            fcfsDurationMinutes: 60,
            maxWhitelistBuy: 50,
            admins: IDO_ADMINS,
          }}
        />
      </Jumbo>
    </Layout>
  );
}

Secrethouse.ignoreDefaultChainSwitch = true;
