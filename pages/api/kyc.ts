import { getApplicant } from "lib/kycaid";
import { DBUser, getUser, updateUser } from "lib/user";
import { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";

type Data = {
  message: string;
  status?: DBUser["status"];
  formUrl?: string;
  declineReason?: string;
  data?: any;
};

/**
 * User references is the wallet address.
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userRef, refresh } = req.query as {
    userRef: string;
    refresh?: string;
  };
  if (!userRef) {
    return res.status(400).json({ message: "userRef is missing" });
  }
  if (!Web3.utils.isAddress(userRef)) {
    return res.status(400).json({ message: "userRef is not a valid address" });
  }

  if (process.env.NO_REDIS) {
    return res.json({ message: "userRef does not exist", status: "nothing" });
  }

  const dbUser = await getUser(userRef);
  if (!dbUser.status || dbUser.status === "nothing") {
    return res.json({ message: "Not initiated KYC", status: "nothing" });
  }
  const formUrl = dbUser?.formUrl || "";

  if (
    dbUser.status &&
    !["nothing", "new"].includes(dbUser.status) &&
    !refresh
  ) {
    return res.json({
      message: "Returning from DB",
      status: dbUser.status,
      formUrl,
      data: {
        dbValue: dbUser,
      },
    });
  }

  const { applicantId } = dbUser;
  try {
    const applicant = await getApplicant(applicantId);
    const status = applicant.verification_status;

    if (!["nothing", "new"].includes(status)) {
      console.log("updaing the user status", status, userRef);
      await updateUser(userRef, { ...dbUser, status });
    }

    return res.json({
      message: "Found the applicant",
      status,
      formUrl,
      data: {
        dbValue: dbUser,
      },
    });
  } catch (e) {
    if (e.response.status === 404) {
      return res.json({ message: "Applicant not found", status: "nothing" });
    }

    console.log("Error from API", e);
    return res.status(500).json({ message: e.toString() });
  }
};
