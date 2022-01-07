import { useUser } from "@trustpad/launchpad";
import * as React from "react";
import { FaCheck, FaCircleNotch } from "react-icons/fa";
import { KYCVerifyButton } from "./KYCVerifyButton";

export function KYCVerifyIDOButton({
  center,
  children,
}: {
  center?: boolean;
  children?: JSX.Element;
}) {
  const { kycStatus } = useUser();

  const Wrapper = ({ children }) => (
    <div
      className={
        center
          ? "space-y-3 relative z-20 text-center"
          : "space-y-3 relative z-20"
      }
    >
      {children}
    </div>
  );

  if (kycStatus === "valid") {
    return (
      children || (
        <Wrapper>
          <div className="flex items-center justify-center">
            <span>KYC verified</span>{" "}
            <FaCheck className="text-green-600 ml-1" />
          </div>
        </Wrapper>
      )
    );
  }

  if (kycStatus === "pending" || kycStatus === "processing") {
    return (
      <Wrapper>
        KYC: <b>In review</b>{" "}
        <FaCircleNotch className="inline fa-spin ml-1 align-text-bottom" />
      </Wrapper>
    );
  }

  if (kycStatus === "invalid") {
    return (
      <Wrapper>
        <p>You did not pass KYC and can't participate in this IDO.</p>

        <KYCVerifyButton label="Try again" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <p>This IDO requires KYC verification.</p>
      <KYCVerifyButton />
    </Wrapper>
  );
}
