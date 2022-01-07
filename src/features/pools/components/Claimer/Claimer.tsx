import { useUser, useWeb3Provider } from "@trustpad/launchpad";
import BN from "bn.js";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaCheck, FaCircleNotch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { toBN } from "web3-utils";
import { ZERO_BN } from "~config/constants";
import { useClaimerContract } from "~features/pools";
import { Distribution, PoolToken } from "~features/pools/types";
import { call, debug, DEFAULT_FORMAT, fNum, normalizeDecimals } from "~utils";

const DEFAULT_ACCOUNT = "0x0000000000000000000000000000000000000000";

type Claim = {
  idx: number;
  time: number;
  percent: number;
  amount: BN;
  isClaimable: boolean;
  claimedAmount: BN;
};

export function Claimer({
  token,
  distribution,
}: {
  token: PoolToken;
  distribution: Distribution;
}) {
  const { targetChain } = useWeb3Provider();
  const { account } = useUser();
  const { claimerAddress, claimerVersion } = distribution;

  const symbol = distribution.symbol || token.symbol;

  const instance = useClaimerContract(
    claimerAddress,
    // @ts-expect-error
    (claimerVersion as string) || "v2"
  );
  const [claims, setClaims] = useState<Claim[]>([]);
  const [totalClaimed, setTotalClaimed] = useState<BN>(ZERO_BN);
  const [total, setTotal] = useState<BN>(ZERO_BN);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isClaiming, setIsClaiming] = useState<number>();

  useEffect(() => {
    if (!instance) return;

    call(instance, "totalTokens")
      .then((v) => normalizeDecimals(toBN(v), token.decimals))
      .then(setTotal);
    if (claimerVersion === "v1") {
      call(instance, "claimedTokens")
        .then((v) => normalizeDecimals(toBN(v), token.decimals))
        .then(setTotalClaimed);
    } else if (claimerVersion === "v2") {
      call(instance, "getTotalClaimed")
        .then((v) => normalizeDecimals(toBN(v), token.decimals))
        .then(setTotalClaimed)
        .catch((e) => "");
    }
    call(instance, "isPaused").then((v) => setPaused(v));
  }, [instance, account, token.decimals]);

  function refresh() {
    return call(instance, "getClaims", [account || DEFAULT_ACCOUNT])
      .then((data) => {
        debug("Claimer data", data);
        const newClaims = data[0].map((time, idx) => {
          const amount = normalizeDecimals(toBN(data[2][idx]), token.decimals);
          return {
            idx,
            time: parseInt(time),
            percent: parseInt(data[1][idx]) / 1000,
            amount,
            isClaimable: Boolean(data[3][idx]) && amount.gt(ZERO_BN),
            claimedAmount: normalizeDecimals(
              toBN(data[4][idx]),
              token.decimals
            ),
          };
        });

        setClaims(newClaims);
      })
      .catch((e) => {
        console.error("Failed to fetch claims", e);
      });
  }

  // Refresh when new item becomes claimable
  useEffect(() => {
    if (!claims.length) return;

    const now = Date.now() / 1000;
    const times = claims.map((claim) => claim.time).filter((t) => t > now);
    const nextTime = Math.min(...times);
    if (times.length > 0) {
      const id = setTimeout(refresh, (nextTime - now) * 1000);
      return () => clearTimeout(id);
    }
  }, [claims.length]);

  useEffect(() => {
    if (!instance) return;

    refresh().finally(() => setLoaded(true));
  }, [instance, account]);

  function claimTokens(idx: number) {
    if (!account) return;

    setIsClaiming(idx);
    instance.methods
      .claim(account, idx)
      .send({
        value: 0,
        from: account,
        ...(targetChain.symbol === "POLY" ? { gasPrice: "100000000000" } : {}),
      })
      .then(() => {
        refresh();
        toast.success(`Claimed ${fNum(claims[idx].amount)} ${symbol}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch(() => {
        toast.error(`Failed to claim`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .finally(() => setIsClaiming(undefined));
  }

  function claimAll() {
    if (!account) return;

    setIsClaiming(-1);
    instance.methods
      .claimAll(account)
      .send({
        value: 0,
        from: account,
        ...(targetChain.symbol === "POLY" ? { gasPrice: "100000000000" } : {}),
      })
      .then(() => {
        refresh();
        toast.success(`Claimed all`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch(() => {
        toast.error(
          `Failed to claim or "Claim all" is not supported in this claimer`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      })
      .finally(() => setIsClaiming(undefined));
  }

  const userTotal = claims.reduce(
    (acc, claim) => acc.add(claim.amount),
    ZERO_BN
  );
  const userTotalClaimed = claims.reduce(
    (acc, claim) => acc.add(claim.claimedAmount),
    ZERO_BN
  );

  const availableClaims = claims.filter(
    (c) => c.isClaimable && c.claimedAmount.eqn(0)
  );

  return (
    <div className="space-y-3">
      {paused && (
        <p>
          The distribution is paused until further notice. For questions please
          head to the project Telegram group.
        </p>
      )}

      <table className="table table-striped table-sm">
        <caption className="text-white opacity-50 text-sm">
          <p
            data-tip={`Total claimer stats: ${fNum(
              totalClaimed
            )} ${symbol} / ${fNum(total)} ${symbol}`}
          >
            Total: {fNum(userTotalClaimed)} {symbol} / {fNum(userTotal)}{" "}
            {symbol}
          </p>
        </caption>
        <thead>
          <tr>
            <th className="w-40">Date</th>
            <th className="w-12">%</th>
            <th>Amount</th>
            <th className="text-center text-pink">
              <Button
                variant={
                  availableClaims.length
                    ? "outline-primary"
                    : "outline-secondary"
                }
                size="sm"
                onClick={() => claimAll()}
                disabled={!availableClaims.length}
              >
                Claim all ({availableClaims.length})
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {!loaded && (
            <tr>
              <td colSpan={5}>
                <Skeleton count={5} />
              </td>
            </tr>
          )}

          {claims.map((claim) => (
            <tr key={claim.idx}>
              <td>
                <ClaimTime claim={claim} paused={paused} />
              </td>
              <td>{claim.percent}%</td>
              <td>
                {fNum(claim.amount)} {symbol}
              </td>
              <td className="text-center">
                <ClaimButton
                  claim={claim}
                  tokenSymbol={symbol}
                  account={account}
                  paused={paused}
                  isClaiming={isClaiming}
                  claimTokens={claimTokens}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClaimTime({ claim, paused }: { claim: Claim; paused: boolean }) {
  const isClaimed = claim.claimedAmount.gt(ZERO_BN);
  if (!claim.time || (paused && !isClaimed)) {
    return <>TBC</>;
  }

  return <>{dayjs.unix(claim.time).utc().format(DEFAULT_FORMAT)} UTC</>;
}

function ClaimButton({
  claim,
  tokenSymbol,
  account,
  paused,
  isClaiming,
  claimTokens,
}: {
  claim: Claim;
  tokenSymbol: string;
  account: string;
  paused: boolean;
  isClaiming?: number;
  claimTokens: (claimIdx: number) => void;
}) {
  if (claim.claimedAmount.gt(ZERO_BN)) {
    return (
      <div>
        {fNum(claim.claimedAmount)} {tokenSymbol}{" "}
        <FaCheck className="inline text-green-600 ml-1" />
      </div>
    );
  }

  if (!account) {
    return (
      <Button variant="outline-light" size="sm" disabled>
        Connect wallet first
      </Button>
    );
  }

  if (paused) {
    return (
      <Button variant="outline-light" size="sm" disabled>
        Paused
      </Button>
    );
  }

  if (claim.isClaimable) {
    return (
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => claimTokens(claim.idx)}
        disabled={isClaiming !== undefined}
      >
        {(isClaiming === claim.idx || isClaiming === -1) && (
          <FaCircleNotch className="inline fa-spin mr-2" />
        )}
        Claim
      </Button>
    );
  }

  return (
    <Button variant="outline-light" size="sm" disabled>
      Not claimable
    </Button>
  );
}
