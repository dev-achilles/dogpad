import { chainToExplorerLabel } from "@trustpad/launchpad";
import * as React from "react";
import { Card } from "react-bootstrap";
import { FaCircleNotch } from "react-icons/fa";
import { getAddressUrl } from "../utils";

export function TMain({ className = "", children }) {
  return <span className={`text-main ${className}`}>{children}</span>;
}

export function TMainLight({ children }) {
  return <span className="text-second-purple font-semibold">{children}</span>;
}

export function PageTitle({
  children,
  className = "",
}: {
  children: any;
  className?: string;
}) {
  return <h2 className={`h1 py-6 mt-2 font-Poppins ${className}`}>{children}</h2>;
}

export function StandardCard({
  className = "",
  cardClassName = "",
  children,
}: {
  cardClassName?: string;
  className?: string;
  children: any;
}) {
  return (
    <Card bg="overflow-hidden bg-black bg-opacity-90 rounded-lg shadow-2xl brand-shadow border-0 z-10 card bg-dark" className={cardClassName}>
      <Card.Body className={className}>{children}</Card.Body>
    </Card>
  );
}

export function CardTitle({ children }: { children: any }) {
  // return <Card.Title className="border-l-4 border-main px-4 py-1">{children}</Card.Title>;
  return <Card.Title className="">{children}</Card.Title>;
}

export function MaxButton({
  label = "Max",
  onClick,
}: {
  label?: string;
  onClick: VoidFunction;
}) {
  return (
    <button
      className="px-2 py-1 bg-gray-500 bg-opacity-50 rounded text-sm text-gray-400"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export const DividerLine = () => (
  <div className="border border-gray-500 border-opacity-25" />
);

export const SecondaryCard = ({ children }) => (
  <div className="bg-mainDark rounded-2xl p-3 bg-opacity-50 space-y-1 mb-1">
    {children}
  </div>
);

export const BscContractLink = ({
  address,
  size = "h-6",
  className,
}: {
  address: string;
  size?: string;
  className?: string;
}) => (
  <a
    href={getAddressUrl(address)}
    target="_blank"
    className={className}
    rel="noreferrer"
  >
    <chainToExplorerLabel.BSC className={`${size} inline`} />
  </a>
);

export const Spinner = () => <FaCircleNotch className="inline fa-spin mr-2" />;
