import { getUser, updateUser } from "lib/user";
import { NextApiRequest, NextApiResponse } from "next";
import { getApplicant, KYCAID_API_KEY } from "lib/kycaid";

type CallbackBody = {
  type: "VERIFICATION_COMPLETED";
  verification_id: string;
  applicant_id: string;
  status: "pending" | "unused" | "completed";
  verified: boolean;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Only POST allowed" });
  }

  if (req.headers.authorization !== `Token ${KYCAID_API_KEY}`) {
    return res.status(400).json({ message: "Invalid auth" });
  }

  const data = req.body as CallbackBody;
  if (data.type !== "VERIFICATION_COMPLETED") {
    return res.status(400).json({ message: "Invalid event type" });
  }

  let applicant;
  try {
    applicant = await getApplicant(data.applicant_id);
  } catch (e) {
    return res.status(500).json({ message: "API error", error: e });
  }

  const boundToAddress =
    applicant.external_applicant_id || applicant?.wallet_address;
  if (!boundToAddress) {
    return res
      .status(500)
      .json({ message: "Empty external_applicant_id", applicant });
  }

  const updatedUser = await updateUserKYC(boundToAddress, data);

  const updateSecond =
    applicant?.wallet_address && applicant.wallet_address !== boundToAddress;
  if (updateSecond) {
    await updateUserKYC(applicant.wallet_address, data);
  }

  return res.json({
    message: updateSecond
      ? "Processed both external_applicant_id and wallet_address"
      : "Processed",
    updatedDbUser: updatedUser,
  });
};

async function updateUserKYC(address: string, data: CallbackBody) {
  const dbUser = await getUser(address);
  const updatedUser = {
    ...dbUser,
    address,
    applicantId: data.applicant_id,
    verificationId: data.verification_id,
    status: data.verified ? ("valid" as const) : ("invalid" as const),
  };
  await updateUser(address, updatedUser);

  return updatedUser;
}
