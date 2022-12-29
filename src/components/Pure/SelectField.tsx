import { ChangeEventHandler, FocusEventHandler } from 'react';

export type Category = {
  _id: string;
  name: string;
  icon?: string;
  sub_category?: Array<Category>;
};

interface Options {
  accounts: Array<Category>;
  categories: Array<Category>;
  type: Array<Category>;
}

interface SelectField {
  label: string;
  inputName: string;
  optGroup?: Options['categories'];
  haveSubCategory?: boolean;
  value: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  handleBlur: FocusEventHandler<HTMLSelectElement>;
  errorMessage?: string | null;
}

const SelectField = ({
  label,
  inputName,
  value,
  optGroup,
  haveSubCategory = false,
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
      >
        {optGroup && !haveSubCategory
          ? optGroup.map((opt) => {
              return (
                <option key={opt._id} value={opt._id}>
                  {opt.name}
                </option>
              );
            })
          : null}

        {optGroup && haveSubCategory
          ? optGroup.map((opt) => (
              <>
                <option key={opt._id} value={opt._id}>
                  {opt.icon}
                  {opt.name}
                </option>
                {opt.sub_category &&
                  opt.sub_category.map((sub_category) => (
                    <option key={sub_category._id} value={sub_category._id}>
                      {sub_category.icon} - {sub_category.name}
                    </option>
                  ))}
              </>
            ))
          : null}
      </select>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
};

export default SelectField;
