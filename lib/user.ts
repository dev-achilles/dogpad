import { User } from "@trustpad/launchpad/dist/shared/hooks/useUser";
import { hexToBuffer } from "@walletconnect/encoding";
import {
  bufferToHex,
  ecrecover,
  fromRpcSig,
  hashPersonalMessage,
  publicToAddress,
  toBuffer,
} from "ethereumjs-util";
import redis, { getJson } from "lib/redis";
import { stringToHex } from "web3-utils";

export type DBUser = {
  address: string;
  status: User["kycStatus"];
  applicantId?: string;
  verificationId?: string;
  formUrl?: string;
  solanaWallet?: string;
};

export async function getUser(address: string) {
  try {
    return await getJson<DBUser>(address, { address, status: "nothing" });
  } catch (e) {
    console.log("Failed to read from Redis", e);
    throw e;
  }
}

export async function updateUser(address: string, data: DBUser) {
  try {
    await redis.set(address, JSON.stringify(data));
  } catch (e) {
    console.log("Failed to read from Redis", e);
    throw e;
  }
}

export function verifySignature(
  account: string,
  message: string,
  signature: string
): boolean {
  const msgBuffer = toBuffer(stringToHex(message));
  const msgHash = hashPersonalMessage(msgBuffer);
  const signatureParams = fromRpcSig(signature);
  const publicKey = ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s
  );
  const addressBuffer = publicToAddress(publicKey);
  const signedBy = bufferToHex(addressBuffer);

  return signedBy.toLowerCase() === account.toLowerCase();
}
