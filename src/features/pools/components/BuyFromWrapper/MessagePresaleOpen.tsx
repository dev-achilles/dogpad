import React from "react";

export function MessagePresaleOpen({
  hadRegistration,
  kyc,
}: {
  hadRegistration: boolean;
  kyc: boolean;
}) {
  return (
    <div className="space-y-3">
      {hadRegistration && (
        <p className="text-center text-lg">Registration closed</p>
      )}
      <p className="text-center text-lg">The sale will open soon</p>
    </div>
  );
}
