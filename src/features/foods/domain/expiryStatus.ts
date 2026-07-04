import {
  differenceInCalendarDays,
  parseYmdToLocalDate,
} from "../../../shared/utils/date";

export type ExpiryStatus = "expired" | "expiringSoon" | "safe";

const EXPIRING_SOON_THRESHOLD_DAYS = 3;

export function getExpiryStatus(expiryDate: string, today: Date): ExpiryStatus {
  const expiry = parseYmdToLocalDate(expiryDate);
  const daysUntilExpiry = differenceInCalendarDays(today, expiry);

  if (daysUntilExpiry < 0) {
    return "expired";
  }

  if (daysUntilExpiry <= EXPIRING_SOON_THRESHOLD_DAYS) {
    return "expiringSoon";
  }

  return "safe";
}
