import { ChangeEventHandler, FocusEventHandler } from "react";

interface InputField {
  label: string;
  inputName: string;
  type?: string;
  value: string | number;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
}

const InputField = ({
  label,
  inputName,
  type,
  value,
  handleBlur,
  handleChange,
  errorMessage,
}: InputField) => {
  return (
    <div>
      <label htmlFor={inputName}>{label}</label>
      <input
        type={type ? type : "text"}
        name={inputName}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
};

export default InputField;
