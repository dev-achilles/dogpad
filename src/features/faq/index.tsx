import React, { useState } from "react";

export function FAQItem({
  expanded: initExpanded,
  question,
  children,
}: {
  expanded?: boolean;
  question: string | JSX.Element;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(initExpanded);

  return (
    <div className="border-b border-gray-400 border-opacity-50 space-y-3 p-6 overflow-hidden">
      <div
        className={`text-xl cursor-pointer ${
          expanded ? "brand-text" : "opacity-80"
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        {question}
      </div>
      <div className={`pb-3 font-light ${expanded ? "" : "hidden"}`}>
        {children}
      </div>
    </div>
  );
}
