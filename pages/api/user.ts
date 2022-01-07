import { DBUser, getUser, updateUser, verifySignature } from "lib/user";
import { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";
import { debug } from "~utils";
import { getMessageToSign, isValidSolAddress } from "~utils/solana";

type Data = {
  message: string;
  user?: Pick<DBUser, "solanaWallet">;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { account } = req.query as {
    account: string;
  };
  if (!account) {
    return res.status(400).json({ message: "account is missing" });
  }
  if (!Web3.utils.isAddress(account)) {
    return res.status(400).json({ message: "account is not a valid address" });
  }

  const user = await getUser(account);
  if (req.method === "POST") {
    debug("/api/user: Got POST", req.query, req.body);
    const { solanaWallet, signature } = req.body;

    if (!isValidSolAddress(solanaWallet)) {
      return res.status(400).json({ message: "Invalid Solana wallet address" });
    }

    const verified = verifySignature(
      account,
      getMessageToSign(solanaWallet),
      signature
    );
    if (!verified) {
      return res.status(400).json({
        message: `Invalid signature`,
      });
    }

    const newUser = { ...user, solanaWallet };
    await updateUser(account, newUser);

    return res
      .status(200)
      .json({ message: "Solana wallet updated", user: newUser });
  }

  return res.status(200).json({
    message: "User solana wallet",
    user: { solanaWallet: user.solanaWallet },
  });
};
