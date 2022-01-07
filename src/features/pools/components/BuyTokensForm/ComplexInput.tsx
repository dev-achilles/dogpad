import React from "react";

const css = `
input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

  /* Firefox */
  input[type=number] {
  -moz-appearance: textfield;
}`;

export function ComplexInput({
  name,
  value,
  disabled,
  onChange,
  topLabel,
  topRight,
  icon,
  button,
  className = "",
  hasError = false,
  placeholder = "",
  wholeNumber = false,
}: {
  name: string;
  value: string;
  disabled: boolean;
  onChange: (e: any) => void;
  icon: JSX.Element;
  topLabel: string;
  topRight: string;
  button?: JSX.Element;
  className?: string;
  hasError?: boolean;
  placeholder?: string;
  wholeNumber?: boolean;
}) {
  const errorClass = hasError ? "border-red-500 focus-within:ring-red-500" : "";
  return (
    <div
      className={`flex flex-col py-2 px-4 rounded-2xl border border-gray-600
      transition ${errorClass}
       focus-within:outline-none focus-within:ring-2 focus-within:ring-sec
        focus-within:border-transparent ${className}`}
    >
      <div className="flex justify-between mb-1">
        <div className="text-gray-400 text-sm">{topLabel}</div>

        {topRight && <div className="text-gray-400 text-sm">{topRight}</div>}
      </div>

      <div className="flex justify-between items-center">
        <input
          name={name}
          type={wholeNumber ? "number" : "text"}
          className="bg-transparent focus:outline-none w-4/5 outline-none border-0 focus:border-0"
          value={value}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
        />

        {button && <div className="mr-2">{button}</div>}

        <div className="">{icon}</div>

        <style>{css}</style>
      </div>
    </div>
  );
}
