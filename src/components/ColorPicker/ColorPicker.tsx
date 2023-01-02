import React, { ChangeEventHandler, FocusEventHandler, useEffect } from 'react';
import { useState } from 'react';
import { colors } from '../../Interfaces/colors.enum';
import ColorCircle from '../Molecules/ColorCircle/ColorCircle';

type ColorPickerProps = {
  setFieldValue: Function;
  name: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  handleBlur: FocusEventHandler<HTMLSelectElement>;
};

const ColorPicker = ({
  setFieldValue,
  name,
  value,
  handleChange,
  handleBlur,
}: ColorPickerProps) => {
  const [colorPicked, setColorPicked] = useState(value);
  const selectColor = (value: string) => {
    console.log(value);

    setColorPicked(value);
    setFieldValue(name, value);
  };
  useEffect(() => {
    setColorPicked(value);
  }, [value]);

  return (
    <div className="bg-mainColor-300 flex flex-wrap justify-around p-2 gap-2 rounded">
      {colors &&
        colors?.map((col) => {
          return (
            <ColorCircle
              isConfig={true}
              color={col.rgb}
              selected={colorPicked}
              key={col.rgb}
              value={col.rgb}
              handleClick={selectColor}
            />
          );
        })}
    </div>
  );
};

export default ColorPicker;
