import * as React from "react";
import { Button, ButtonProps } from "react-bootstrap";
import { FaCircleNotch } from "react-icons/fa";

export function ActionButton({
  isLoading,
  isDisabled,
  onClick,
  children,
  ...props
}: {
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick: VoidFunction;
  children: React.ReactNode;
} & ButtonProps) {
  return (
    <Button
      variant="primary"
      disabled={isDisabled}
      onClick={() => onClick()}
      {...props}
    >
      {isLoading && <FaCircleNotch className="inline fa-spin mr-2" />}
      {children}
    </Button>
  );
}
