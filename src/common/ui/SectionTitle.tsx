import React from "react";
import styles from "./SectionTitle.module.css";

export const SectionTitle = ({
  yellow,
  className = "",
  children,
}: {
  yellow?: boolean;
  className?: string;
  children: React.ReactNode;
}) => (
  <h2 className={`${yellow ? styles.titleYellow : styles.title} ${className}`}>
    {children}
  </h2>
);
