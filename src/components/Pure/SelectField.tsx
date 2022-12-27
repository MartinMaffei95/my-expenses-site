import { ChangeEventHandler, FocusEventHandler } from 'react';

interface Options {
  key: string;
  value: string;
}

interface SelectField {
  label: string;
  inputName: string;
  optGroup?: Array<Options>;
  value: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  handleBlur: FocusEventHandler<HTMLSelectElement>;
  errorMessage?: string | null;
}

const SelectField = ({
  label,
  inputName,
  value,
  handleBlur,
  handleChange,
  errorMessage,
}: SelectField) => {
  return (
    <div>
      <label htmlFor={inputName}>{label}</label>
      <select
        name={inputName}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
      ></select>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
};

export default SelectField;
