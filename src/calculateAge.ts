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
  // Parse dates
  const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
  const [endYear, endMonth, endDay] = endDate.split("-").map(Number);

  // Start with the difference
  let years = endYear - startYear;
  let months = endMonth - startMonth;
  let days = endDay - startDay;

  // Adjust for negative days
  if (days < 0) {
    months--;
    // Get days in the previous month
    const previousMonth = endMonth === 1 ? 12 : endMonth - 1;
    const previousYear = endMonth === 1 ? endYear - 1 : endYear;
    const daysInPreviousMonth = getDaysInMonth(previousYear, previousMonth);
    days += daysInPreviousMonth;
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  // Convert excess days to weeks
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
