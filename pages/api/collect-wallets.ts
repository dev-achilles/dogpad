import redis from "lib/redis";
import {DBUser} from "lib/user";
import {NextApiRequest, NextApiResponse} from "next";

type Data = {
  message: string;
  wallets?: Record<string, string>;
  notFound?: string[];
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    return res.status(400).json({message: `Only POST allowed`});
  }

  const {addresses} = req.body;
  console.log(
    "body",
    req.body,
    addresses,
    typeof addresses,
    Array.isArray(addresses)
  );
  if (!addresses || !Array.isArray(addresses)) {
    return res
      .status(400)
      .json({message: `An array of addresses must be specified in body`});
  }

  const users = await redis.mget(Array.from(new Set(addresses)));
  const notFound = new Set(addresses);
  const bscToSol = users.reduce((acc, str) => {
    if (!str) {
      return acc;
    }
    const user: DBUser = JSON.parse(str);
    notFound.delete(user.address);
    acc[user.address] = user.solanaWallet;
    return acc;
  }, {});

  return res.status(200).json({
    message: "Collected solana wallets",
    wallets: bscToSol,
    notFound: Array.from(notFound),
  });
};
