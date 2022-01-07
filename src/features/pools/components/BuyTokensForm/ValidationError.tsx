import React from "react";

export function ValidationError({
  currencyError,
  tokenError,
}: {
  currencyError: string | null;
  tokenError: string | null;
}) {
  return (
    <div className="break-all text-center">
      {(currencyError || tokenError) && (
        <div className="text-red-500">{currencyError || tokenError}</div>
      )}
    </div>
  );
}
