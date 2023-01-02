import { string } from 'yup';

export type ColorOpt = {
  name: string;
  rgb: string;
};

export const colors: Array<ColorOpt> = [
  { name: 'RED1', rgb: 'rgb(245 183 177)' },
  { name: 'RED2', rgb: 'rgb(220 38 38)' },
  { name: 'RED3', rgb: 'rgb(120 40 31)' },

  { name: 'BLUE1', rgb: 'rgb(133 193 233)' },
  { name: 'BLUE2', rgb: 'rgb(46 134 193)' },
  { name: 'BLUE3', rgb: 'rgb(27 79 114)' },

  { name: 'GREEN1', rgb: 'rgb(130 224 170)' },
  { name: 'GREEN2', rgb: 'rgb(40 180 99)' },
  { name: 'GREEN3', rgb: 'rgb(24 106 59)' },

  { name: 'ORANGE1', rgb: 'rgb(235 152 78)' },
  { name: 'ORANGE2', rgb: 'rgb(175 96 26)' },
  { name: 'ORANGE3', rgb: 'rgb(126 81 9)' },

  { name: 'VIOLET1', rgb: 'rgb(165 105 189)' },
  { name: 'VIOLET2', rgb: 'rgb(125 60 152)' },
  { name: 'VIOLET3', rgb: 'rgb(74 35 90)' },

  { name: 'SLATE1', rgb: 'rgb(93 109 126)' },
  { name: 'SLATE2', rgb: 'rgb(46 64 83)' },
  { name: 'SLATE3', rgb: 'rgb(33 47 60)' },

  { name: 'YELLOW1', rgb: 'rgb(244 208 63)' },
  { name: 'YELLOW2', rgb: 'rgb(212 172 13)' },
  { name: 'YELLOW3', rgb: 'rgb(125 102 8)' },
];
