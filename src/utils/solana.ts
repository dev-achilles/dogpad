/**
 * https://docs.solana.com/integrations/exchange#validating-user-supplied-account-addresses-for-withdrawals
 * @param address
 */
import { decode } from "~utils/base58";

export const getMessageToSign = (address: string) =>
  `My SOL wallet for distribution is: ${address}`;

export function isValidSolAddress(address?: string) {
  if (!address?.match(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)) return false;

  const decoded = decode(address);
  return decoded.length == 32;
}
