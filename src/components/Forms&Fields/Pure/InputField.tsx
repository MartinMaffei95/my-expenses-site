import { ChangeEventHandler, FocusEventHandler } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
interface InputField {
  label: string;
  inputName: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  errorMessage?: string | null;
  inputClassname?: string;
  labelClassname?: string;
  icon?: JSX.Element;
  iconPosition?: string;
  iconFX?: Function;
}

const InputField = ({
  label,
  inputName,
  type,
  value,
  placeholder,
  handleBlur,
  handleChange,
  errorMessage,
  inputClassname,
  labelClassname,
  icon,
  iconPosition,
  iconFX,
}: InputField) => {
  return (
    <div className="relative">
      <label
        htmlFor={inputName}
        className={labelClassname ? `${labelClassname}` : ''}
      >
        {label}
      </label>
      <input
        type={type ? type : 'text'}
        placeholder={placeholder ? placeholder : ''}
        name={inputName}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        className={inputClassname ? `${inputClassname}` : ''}
      />
      <span
        onClick={() => iconFX && iconFX()}
        className="absolute z-1000000 text-primary-800 text-2xl right-0 top-0 m-2"
      >
        {icon ? icon : null}
      </span>
      {/* iconPosition */}
      {errorMessage ? (
        <p className="text-red-600 pl-4 flex min-h-full items-center justify-start">
          <FiAlertCircle /> {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
