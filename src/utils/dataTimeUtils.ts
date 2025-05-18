import { format } from 'date-fns-tz';

export const getCurrentTimestamp = (): string => {
  const now = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return format(now, 'MM/dd/yyyy hh:mm zzz', { timeZone });
};
