import React from "react";

export function MaxButton({ onClick }: { onClick: VoidFunction }) {
  return (
    <button
      className="px-2 py-1 bg-gray-500 bg-opacity-50 rounded text-xs text-gray-400"
      onClick={onClick}
    >
      Max
    </button>
  );
}
