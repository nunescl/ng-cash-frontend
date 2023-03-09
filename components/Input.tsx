import React from "react";

export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  placeholder,
}: {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
}) {
  return (
    <div className="grid text-gray-100 mt-5">
      <label htmlFor={name} className="ml-1">
        {label}
      </label>
      <input
        id={name}
        spellCheck="false"
        name={name}
        className="border-b-2 border-black outline-none pl-1 mt-1"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="">{error}</p>}
    </div>
  );
}
