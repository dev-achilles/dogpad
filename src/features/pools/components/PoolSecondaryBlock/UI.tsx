import * as React from "react";

export const Title = ({
  size = "text-lg",
  children,
  className,
}: {
  size?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <h2
    className={`${size} mb-2 font-Poppins tracking-wider text-pink ${
      className || ""
    }`}
  >
    {children}
  </h2>
);
