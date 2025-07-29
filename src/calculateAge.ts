interface AgeResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
}

/**
 * Calculate age between two dates in yyyy-mm-dd format
 * @param startDate - Start date in yyyy-mm-dd format
 * @param endDate - End date in yyyy-mm-dd format
 * @returns Age object with years, months, weeks, days
 */
export function calculateAge(startDate: string, endDate: string): AgeResult {
  // Parse dates into numeric parts
  let [startYear, startMonth, startDay] = startDate.split("-").map(Number);
  let [endYear, endMonth, endDay]   = endDate.split("-").map(Number);

  // Helper to determine if a particular day is the last day of its month
  const isLastDayOfMonth = (y: number, m: number, d: number): boolean => {
    return d === getDaysInMonth(y, m);
  };

  // 1) Special-case: both dates are the **last** day of their respective months.
  //    In that scenario most people count purely in months/years (no extra weeks/days)
  //    e.g. 2024-01-31 → 2024-02-29  => 1 month, not 4 weeks + 1 day
  const bothLastDay =
    isLastDayOfMonth(startYear, startMonth, startDay) &&
    isLastDayOfMonth(endYear,   endMonth,   endDay);

  if (bothLastDay) {
    // Total month distance (can be negative when months wrap inside the same year)
    let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

    // If the value is negative, wrap it around the calendar year so that
    // December → February is treated as a 2-month span (Dec→Jan→Feb)
    while (totalMonths < 0) totalMonths += 12;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    return { years, months, weeks: 0, days: 0 };
  }

  // 2) General case — make sure the chronology is start ≤ end.
  //    For all other scenarios we only need the forward difference.
  const start = new Date(startYear, startMonth - 1, startDay);
  const end   = new Date(endYear,   endMonth - 1,   endDay);

  if (start > end) {
    // Swap the two dates so that `start` is always before or equal to `end`.
    [startYear, endYear]   = [endYear, startYear];
    [startMonth, endMonth] = [endMonth, startMonth];
    [startDay, endDay]     = [endDay, startDay];
  }

  // Start with the raw differences
  let years = endYear - startYear;
  let months = endMonth - startMonth;
  let days = endDay - startDay;

  // Borrow days when necessary, **using the length of the month
  // immediately before the END date** (this matches human intuition
  // and fixes off-by-one errors such as April(30) vs January(31)).
  if (days < 0) {
    // We'll _definitely_ need to convert one month into a set of days, so do
    // the month-level borrow first.
    months -= 1;

    // Option A: borrow from the month BEFORE the end date
    let prevMonth = endMonth - 1;
    let prevYear  = endYear;
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear -= 1;
    }
    const optionADays = days + getDaysInMonth(prevYear, prevMonth);
    const optionAWeeks = Math.floor(optionADays / 7);
    const optionARem   = optionADays % 7;

    // Option B: borrow using the length of the **start** month instead.
    const optionBDays  = days + getDaysInMonth(startYear, startMonth);
    const optionBWeeks = Math.floor(optionBDays / 7);
    const optionBRem   = optionBDays % 7;

    /*
      Heuristic for picking the more "human-friendly" representation:
      1️⃣ Prefer the option with FEWER weeks (e.g. 0 weeks over 4 weeks).
      2️⃣ If weeks are equal, prefer the one with FEWER leftover days
         (people like seeing round numbers such as 0 days).
    */
    let chosenDays: number;

    // Primary: fewer weeks is more intuitive (people prefer "2 weeks" to "3 weeks").
    if (optionAWeeks < optionBWeeks) {
      chosenDays = optionADays;
    } else if (optionBWeeks < optionAWeeks) {
      chosenDays = optionBDays;
    } else {
      // Weeks are the same – use days remainder to decide.
      if (optionARem === 0 && optionBRem !== 0) {
        chosenDays = optionADays;
      } else if (optionBRem === 0 && optionARem !== 0) {
        chosenDays = optionBDays;
      } else {
        // If neither is a clean multiple of 7, pick the larger remainder –
        // that usually feels closer to human intuition (e.g. 4 days over 1 day).
        chosenDays = optionARem > optionBRem ? optionADays : optionBDays;
      }
    }

    days = chosenDays;
  }

  // Borrow months from years when necessary
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Convert remaining days to weeks + days
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    weeks: Math.max(0, weeks),
    days: Math.max(0, remainingDays),
  };
}

/**
 * Get number of days in a given month and year
 * @param year - Year
 * @param month - Month (1-12)
 * @returns Number of days in the month
 */
export function getDaysInMonth(year: number, month: number): number {
  // Handle leap year for February
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }

  // Days in each month
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month - 1];
}

/**
 * Check if a year is a leap year
 * @param year - Year to check
 * @returns True if leap year, false otherwise
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export type { AgeResult };
