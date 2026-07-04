export function parseYmdToLocalDate(ymd: string): Date {
  const [year, month, day] = ymd.split("-").map(Number);

  if (!year || !month || !day) {
    throw new Error(`Invalid date format: ${ymd}`);
  }

  return new Date(year, month - 1, day);
}

export function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function differenceInCalendarDays(from: Date, to: Date): number {
  const fromTime = startOfLocalDay(from).getTime();
  const toTime = startOfLocalDay(to).getTime();

  return Math.round((toTime - fromTime) / (1000 * 60 * 60 * 24));
}
