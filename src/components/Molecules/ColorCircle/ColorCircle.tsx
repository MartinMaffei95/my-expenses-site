import { ColorOpt } from '../../../Interfaces/colors.enum';

type ColorCircle = {
  isConfig: boolean;
  selected?: string;
  color: string;
  value?: [ColorOpt];
  handleClick?: Function;
};

const ColorCircle = ({
  isConfig,
  selected,
  color,
  value,
  handleClick,
}: ColorCircle) => {
  return (
    <div className="relative overflow-visible">
      <div
        className={` w-8 h-8 rounded-full cursor-pointer  `}
        style={{
          background: color,
          border: isConfig
            ? value && selected === value[0].name
              ? `solid 2px ${color}`
              : 'none'
            : `solid 2px ${color}`,
        }}
        onClick={() => {
          handleClick && handleClick(value);
        }}
      ></div>
      {isConfig ? (
        <div
          className={` w-8 h-8 rounded-full cursor-pointer absolute ${
            value && selected === value[0].name ? 'animate-ping ' : ''
          }`}
          style={{
            background: color,
            border:
              value && selected === value[0].name
                ? `solid 2px ${color}`
                : 'none',
          }}
        ></div>
      ) : null}
    </div>
  );
};

export default ColorCircle;
