import axios from "axios";

export const KYCAID_API_KEY = process.env.KYCAID_API;

type Applicant = {
  type: "PERSON";
  verification_status: "pending" | "valid" | "invalid";
  applicant_id: string;
  external_applicant_id: string | null;
  profile_status: any;
  profile_comment: any;
  first_name: string;
  last_name: string;
  residence_country: string;
  email: string;
  wallet_address: string | null;
  telegram_username: string | null;
  decline_reasons: [];
};

export async function getApplicant(applicantId: string) {
  const { data } = await axios.get<any, { data: Applicant }>(
    `https://api.kycaid.com/applicants/${applicantId}`,
    { headers: { Authorization: `Token ${KYCAID_API_KEY}` } }
  );

  return data;
}
