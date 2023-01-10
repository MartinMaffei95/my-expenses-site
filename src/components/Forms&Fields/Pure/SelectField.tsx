import { ChangeEventHandler, FocusEventHandler, SetStateAction } from 'react';
import { NewAccountValues } from '../../../Interfaces/Account.interface';
import { Category } from '../../../Interfaces/Category.interface';
import { CustomIcon } from '../../SelectIcon/Molecule/CustomIcon';

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
  value: string | any;
  placeholder?: string;

  handleChange: ChangeEventHandler<HTMLSelectElement>;
  handleBlur: FocusEventHandler<HTMLSelectElement>;
  errorMessage?: string[] | string | null | any;
  inputClassname?: string;
  labelClassname?: string;
  setValues?: SetStateAction<NewAccountValues>;
}

const SelectField = ({
  label,
  inputName,
  value,
  placeholder,

  optGroup,
  haveSubCategory = false,
  handleBlur,
  handleChange,
  errorMessage,
  inputClassname,
  labelClassname,
  setValues,
}: SelectField) => {
  return (
    <div>
      <label
        htmlFor={inputName}
        className={labelClassname ? `${labelClassname}` : ''}
      >
        {label}
      </label>
      <select
        name={inputName}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        className={inputClassname ? `${inputClassname}` : ''}
      >
        {optGroup && !haveSubCategory
          ? optGroup.map((opt) => {
              return (
                <>
                  {opt._id === undefined || opt._id === '' ? (
                    <option key={''} value={''}>
                      {''}
                    </option>
                  ) : (
                    <option key={opt._id} value={opt._id}>
                      {opt.name}
                    </option>
                  )}
                </>
              );
            })
          : null}

        {optGroup && haveSubCategory
          ? optGroup.map((opt) => (
              <>
                <option key={opt._id} value={opt._id}>
                  {opt?.icon ? <CustomIcon iconName={opt?.icon} /> : null}{' '}
                  {opt.name}
                </option>
                {opt.sub_category &&
                  opt.sub_category.map((sub_category) => (
                    <option key={sub_category._id} value={sub_category._id}>
                      - {sub_category.name}
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
