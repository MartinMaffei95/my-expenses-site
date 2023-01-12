import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export const normalizeDate = (date: string, outType?: string) => {
  let dateFormat = 'DD/MM/YYYY';
  dayjs.extend(customParseFormat);
  const normalizedDate = dayjs(date, dateFormat);
  return normalizedDate;
};

export const normalizeDateOP = (
  date: string = dayjs().format(),
  inType: string = 'YYYY-MM-DD',
  outType: string = 'DD/MM/YYYY'
) => {
  dayjs.extend(customParseFormat);
  const normalizedDate = dayjs(date, inType);
  return normalizedDate.format(outType);
};
