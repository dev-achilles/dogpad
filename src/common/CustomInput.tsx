import * as React from "react";

export function CustomInput({
  name,
  value,
  disabled = false,
  onChange,
  topLabel,
  topRight,
  icon,
  button,
  className = "",
  hasError = false,
  placeholder = "",
}: {
  name: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  icon?: JSX.Element;
  topLabel: string;
  topRight?: string;
  button?: JSX.Element;
  className?: string;
  hasError?: boolean;
  placeholder?: string;
}) {
  const errorClass = hasError
    ? "border-red-500"
    : "focus-within:outline-none focus-within:ring-2 focus-within:ring-sec focus-within:border-transparent";
  const showTop = topLabel || topRight;

  return (
    <div
      className={`flex flex-col py-2 px-4 rounded-2xl border-2 border-gray-500
      transition ${errorClass} ${className}`}
    >
      {showTop && (
        <div className="flex justify-content-between mb-2">
          {topLabel && <div className="text-gray-400 text-sm">{topLabel}</div>}

          {topRight && (
            <div className="text-gray-400 text-sm ml-auto">{topRight}</div>
          )}
        </div>
      )}

      <div className="flex justify-content-between items-center">
        <input
          name={name}
          className="bg-transparent focus:outline-none w-4/5"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.currentTarget.value)}
          placeholder={placeholder}
        />

        {button && <div className="mr-2 flex-shrink-0">{button}</div>}

        {icon && <div>{icon}</div>}
      </div>
    </div>
  );
}
