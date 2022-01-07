import { useUser } from "@trustpad/launchpad";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Spinner } from "../../../../common/UI";

export function KYCVerifyButton({
  label = "Verify KYC",
  size = "md",
}: {
  label?: string;
  size?: "sm" | "lg" | "md";
}) {
  const { account, kycStatus, invalidateCachedKYC } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  function onClick() {
    setIsLoading(true);
    invalidateCachedKYC();
    axios
      .post<any, { data: { formUrl: string } }>("/api/kyc-form", {
        address: account,
        test: "fail",
      })
      .then(({ data }) => {
        window.location.href = data.formUrl;
      })
      .catch((e) => {
        console.error("Failed to get URL form", e);
        toast.error("Failed to start the KYC process", {
          position: "bottom-right",
        });
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Button
      variant="main"
      hidden={!account}
      disabled={isLoading}
      onClick={onClick}
      size={size === "md" ? undefined : size}
    >
      {(isLoading || kycStatus === "new") && <Spinner />}
      {label}
    </Button>
  );
}
