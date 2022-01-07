import axios from "axios";
import { DBUser, getUser } from "lib/user";
import { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";

import redis from "../../lib/redis";

type Data = {
  message: string;
  formUrl?: string;
};

const FORM_ID = process.env.KYCAID_FORM_ID;
const API_KEY = process.env.KYCAID_API;

/**
 * User references is the wallet address.
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Only POST allowed" });
  }
  const { address } = req.body as { address: string };
  if (!address) {
    return res.status(400).json({ message: "address is missing" });
  }
  if (!Web3.utils.isAddress(address)) {
    return res.status(400).json({ message: "address is not a valid address" });
  }

  const dbUser = await getApplicantId(address);

  try {
    const result = await axios.post(
      `https://api.kycaid.com/forms/${FORM_ID}/urls`,
      { applicant_id: dbUser.applicantId },
      { headers: { Authorization: `Token ${API_KEY}` } }
    );
    const { form_url, verification_id } = result.data;

    console.log("KYC-form API result", result.data);

    await redis.set(
      address,
      JSON.stringify({
        ...dbUser,
        verificationId: verification_id,
        formUrl: form_url,
      })
    );

    return res.json({
      message: "Here is the form URL",
      formUrl: form_url,
    });
  } catch (e) {
    console.log("Error from API", e);
    return res.status(500).json({ message: e.toString() });
  }
};

async function getApplicantId(
  address: string,
  test?: "success" | "fail"
): Promise<DBUser> {
  const cached = await getUser(address);
  if (cached && cached.applicantId) {
    return cached;
  }
  try {
    const stored = await redis.get(address);
    const value = JSON.parse(stored);
    console.log("applciant already exists", address);
    if (value) {
      return value;
    }
  } catch (e) {
    console.log("Failed to read from Redis", e);
    throw e;
  }

  try {
    console.log("creating new applicant", address);

    const testData = test
      ? { first_name: "John", last_name: test === "success" ? "Snow" : "Doe" }
      : {};

    const { data } = await axios.post(
      `https://api.kycaid.com/applicants`,
      {
        type: "PERSON",
        external_applicant_id: address,
        ...testData,
      },
      { headers: { Authorization: `Token ${API_KEY}` } }
    );

    const result = {
      applicantId: data.applicant_id,
      address,
      status: "new" as const,
    };

    await redis.set(address, JSON.stringify(result));

    return result;
  } catch (e) {
    console.log("Failed to create applicant, error from API", e);
    throw e;
  }
}
