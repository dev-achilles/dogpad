import { useUser, useWeb3Provider } from "@trustpad/launchpad";
import axios from "axios";
import constate from "constate";
import { useCallback, useEffect, useState } from "react";
import store from "store2";
import { getMessageToSign, isValidSolAddress } from "~utils/solana";

const EXPIRATION = 3600 * 1000;

function useUserSolanaWalletRaw({ fetch }: { fetch: boolean }) {
  const { account } = useUser();
  const { web3 } = useWeb3Provider();
  const [wallet, setWallet] = useState<string>();
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const key = `${account}-solana`;

  useEffect(() => {
    if (!fetch || !account) return;

    const { cached, expiresAt } = store.get(key, { cached: "", expiresAt: 0 });
    if (cached && Date.now() < expiresAt) {
      setWallet(cached);
      return;
    }

    axios
      .get<{ user: { solanaWallet: string } }>(`/api/user?account=${account}`)
      .then(({ data }) => {
        const { user } = data;
        const value = user.solanaWallet || "";
        setWallet(value || "");
        if (value) {
          store.set(key, { cached: value, expiresAt: Date.now() + EXPIRATION });
        }
      })
      .catch((e) => console.error("Failed to get solana wallet", e));
  }, [account, fetch, key]);

  const update = useCallback(
    async (address: string) => {
      if (!isValidSolAddress(address)) return;

      const signature = await web3.eth.personal.sign(
        web3.utils.fromUtf8(getMessageToSign(address)),
        account,
        "pass"
      );

      return axios
        .post(`/api/user?account=${account}`, {
          solanaWallet: address,
          signature,
        })
        .then(() => {
          setWallet(address);
          store.set(key, {
            cached: address,
            expiresAt: Date.now() + EXPIRATION,
          });
          setIsChanging(false);
          return true;
        })
        .catch((e) => {
          console.error("Failed to update solana wallet", e);
          return false;
        });
    },
    [account, web3, key]
  );

  return {
    wallet,
    update,
    toggleChanging: (status?: boolean) =>
      setIsChanging(status === undefined ? !isChanging : status),
    isChanging,
  };
}

export const [UserSolanaWalletProvider, useUserSolanaWallet] = constate(
  useUserSolanaWalletRaw
);
