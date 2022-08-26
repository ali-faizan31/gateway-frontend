import React from "react";
import "../../assets/_Fform-styles.scss";

interface FinputProps {
  label: String;
  name?: any;
  id?: any;
  display?: String;
  className?: String;
  type?: String;
  onClick?: any;
  validations?: any;
  register?: any;
  required?: any;
  error?: any;
  disabled?: boolean;
  readonly?: boolean;
  variant?: string;
}

export const FInputCheckbox = ({
  label = "",
  name = label.toLowerCase().split(" ").join(""),
  id = name + 1,
  type = "checkbox",
  display = "block",
  className = "",
  onClick = () => { },
  validations,
  register,
  required,
  error,
  variant,
  disabled = false,
  readonly = false,
  ...otherProps
}: FinputProps) => {
  return (
    <div className={`f-input-checkbox-group f-input-${display} ${className}`}>
      <div className={`f-input-checkbox ${variant && `f-input-${variant}-checkbox`}`}>
        <input type={`${type}`} id={`${name}`} name={name} onClick={onClick}  {...(register
          ? register(name, { ...validations })
          : { onClick: onClick })} disabled={disabled}
          readOnly={readonly} {...otherProps} />
        <label htmlFor={name}>{label}</label>
      </div>
      {error && (
        <p className={`${error ? "input-validation-error" : ""}`}>
          {error ? error : undefined}
        </p>
      )}
    </div>
  );
};