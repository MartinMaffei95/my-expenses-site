import React, { useEffect } from 'react';
import { useState } from 'react';
import { colors } from '../../../Models/configs/colors.enum';
import ColorCircle from '../../Molecules/ColorCircle/ColorCircle';

const ColorPicker = ({ setFieldValue, name, value }) => {
  const [colorPicked, setColorPicked] = useState(value);
  const selectColor = (value) => {
    setColorPicked(value[0]);
    setFieldValue(name, value[0]);
  };

  useEffect(() => {
    setColorPicked(value);
  }, [value]);

  return (
    <div className="bg-mainColor-300 flex flex-wrap justify-around p-2 gap-2 rounded">
      {colors &&
        colors?.map((col) => (
          <ColorCircle
            color={Object.values(col)}
            selected={colorPicked}
            key={Object.keys(col)}
            value={Object.keys(col)}
            handleClick={selectColor}
          />
        ))}
    </div>
  );
};

export default ColorPicker;
