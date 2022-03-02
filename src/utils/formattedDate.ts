import { DAY_AS_SECONDS, HOUR_AS_SECONDS, MINUTE_AS_SECONDS } from 'utils/dateTimeConverters';

export function formattedDate(separator = '-', d = new Date()) {
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = String(d.getFullYear());

  return [
    year,
    month,
    day,
  ].join(separator);
}

export const formatDateAsDDHHMM = (seconds: number, delimiter = ' ') => {
  const days = Math.floor(seconds / DAY_AS_SECONDS);
  const hours = Math.floor((seconds - days * DAY_AS_SECONDS) / HOUR_AS_SECONDS);
  const minutes = Math.floor(
    (seconds - (days * DAY_AS_SECONDS + hours * HOUR_AS_SECONDS)) / MINUTE_AS_SECONDS,
  );

  return [
    `${days.toString().padStart(2, '0')}d`,
    `${hours.toString().padStart(2, '0')}h`,
    `${minutes.toString().padStart(2, '0')}m`,
  ].join(delimiter);
};
