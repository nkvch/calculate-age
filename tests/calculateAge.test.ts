import { calculateAge, getDaysInMonth, isLeapYear } from '../src';

describe('Age Calculator Utility', () => {
  describe('getDaysInMonth', () => {
    test('should return correct days for January', () => {
      expect(getDaysInMonth(2024, 1)).toBe(31);
    });

    test('should return correct days for February in leap year', () => {
      expect(getDaysInMonth(2024, 2)).toBe(29);
    });

    test('should return correct days for February in non-leap year', () => {
      expect(getDaysInMonth(2023, 2)).toBe(28);
    });

    test('should return correct days for April', () => {
      expect(getDaysInMonth(2024, 4)).toBe(30);
    });

    test('should return correct days for December', () => {
      expect(getDaysInMonth(2024, 12)).toBe(31);
    });

    test('should return number type', () => {
      const result = getDaysInMonth(2024, 1);
      expect(typeof result).toBe('number');
    });
  });

  describe('isLeapYear', () => {
    test('should identify leap years correctly', () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(1600)).toBe(true);
    });

    test('should identify non-leap years correctly', () => {
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(2021)).toBe(false);
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
    });

    test('should return boolean type', () => {
      const result = isLeapYear(2024);
      expect(typeof result).toBe('boolean');
    });
  });
  
  describe('calculateAge', () => {
    test('should calculate simple age difference', () => {
      const result = calculateAge('2023-01-01', '2024-01-01');
      expect(result).toEqual({ years: 1, months: 0, weeks: 0, days: 0 });
    });

    test('should calculate age with months', () => {
      const result = calculateAge('2023-01-01', '2024-03-01');
      expect(result).toEqual({ years: 1, months: 2, weeks: 0, days: 0 });
    });

    test('should calculate age with days converted to weeks', () => {
      const result = calculateAge('2024-01-01', '2024-01-15');
      expect(result).toEqual({ years: 0, months: 0, weeks: 2, days: 0 });
    });

    test('should calculate age with remaining days', () => {
      const result = calculateAge('2024-01-01', '2024-01-10');
      expect(result).toEqual({ years: 0, months: 0, weeks: 1, days: 2 });
    });

    test('should handle the problematic case: Jan 29 to Feb 28', () => {
      const result = calculateAge('2024-01-29', '2024-02-28');
      expect(result).toEqual({ years: 0, months: 0, weeks: 4, days: 2 });
    });

    test('should handle same day calculation', () => {
      const result = calculateAge('2024-01-29', '2024-02-29');
      expect(result).toEqual({ years: 0, months: 1, weeks: 0, days: 0 }); // cuz there's exactly one month between 29th of January and 29th of February
    });

    test('should handle February', () => {
      const result = calculateAge('2023-02-28', '2023-03-28');
      expect(result).toEqual({ years: 0, months: 1, weeks: 0, days: 0 });
    });

    test('should handle February 28 to March 29', () => {
      const result = calculateAge('2023-02-28', '2023-03-29');
      expect(result).toEqual({ years: 0, months: 1, weeks: 0, days: 1 });
    });

    test('should handle February 28 to March 30', () => {
      const result = calculateAge('2023-02-28', '2023-03-30');
      expect(result).toEqual({ years: 0, months: 1, weeks: 0, days: 2 });
    });

    test('should handle February 28 to March 31', () => {
      const result = calculateAge('2023-02-28', '2023-03-31');
      expect(result).toEqual({ years: 0, months: 1, weeks: 0, days: 3 });
    });

    test('should handle February 28 to April 1', () => {
      const result = calculateAge('2023-02-28', '2023-04-01');
      expect(result).toEqual({ years: 0, months: 1, weeks: 0, days: 1 });
    });

    test('should handle non-leap year February', () => {
      const result = calculateAge('2023-01-29', '2023-02-28');
      expect(result).toEqual({ years: 0, months: 0, weeks: 4, days: 2 });
    });

    test('should handle leap year to non-leap year February transition', () => {
        const result = calculateAge('2024-02-29', '2025-02-28');
        expect(result).toEqual({ years: 0, months: 11, weeks: 4, days: 0 });
    });

    test('should calculate age from January to February in non-leap year', () => {
        const result = calculateAge('2025-01-29', '2025-02-28');
        expect(result).toEqual({ years: 0, months: 0, weeks: 4, days: 2 });
    });

    test('should handle end of January to end of February calculation', () => {
        const result = calculateAge('2025-01-30', '2025-02-28');
        expect(result).toEqual({ years: 0, months: 0, weeks: 4, days: 1 });
    });

    test('should handle month boundaries correctly', () => {
      const result = calculateAge('2024-01-31', '2024-02-29');
      expect(result).toEqual({ years: 0, months: 0, weeks: 4, days: 1 });
    });

    test('should handle month boundaries correctly in non-leap year', () => {
      const result = calculateAge('2025-01-31', '2025-02-28');
      expect(result).toEqual({ years: 0, months: 0, weeks: 4, days: 0 });
    });

    test('should handle month boundaries correctly in leap year', () => {
      const result = calculateAge('2024-01-31', '2024-02-28');
      expect(result).toEqual({ years: 0, months: 0, weeks: 4, days: 0 });
    });

    test('should handle year boundaries', () => {
      const result = calculateAge('2023-12-15', '2024-01-20');
      expect(result).toEqual({ years: 0, months: 1, weeks: 0, days: 5 });
    });

    test('should handle same date', () => {
      const result = calculateAge('2024-01-01', '2024-01-01');
      expect(result).toEqual({ years: 0, months: 0, weeks: 0, days: 0 });
    });

    test('should handle complex age calculation', () => {
      const result = calculateAge('2020-03-15', '2024-07-28');
      expect(result).toEqual({ years: 4, months: 4, weeks: 1, days: 6 });
    });

    test('should handle age less than a week', () => {
      const result = calculateAge('2024-01-01', '2024-01-05');
      expect(result).toEqual({ years: 0, months: 0, weeks: 0, days: 4 });
    });

    test('should return correct type', () => {
      const result = calculateAge('2024-01-01', '2024-01-05');
      expect(typeof result.years).toBe('number');
      expect(typeof result.months).toBe('number');
      expect(typeof result.weeks).toBe('number');
      expect(typeof result.days).toBe('number');
    });

    test('real-world example 1', () => {
      const age = calculateAge('2010-12-01', '2015-07-19');
      expect(age).toEqual({ years: 4, months: 7, weeks: 2, days: 4 });
    });

    test('real-world example 2', () => {
      const age = calculateAge('2011-01-06', '2015-05-04');
      expect(age).toEqual({ years: 4, months: 3, weeks: 4, days: 1 });
    });

    test('real-world example 3', () => {
        const age = calculateAge('2011-03-09', '2015-03-22');
        expect(age).toEqual({ years: 4, months: 0, weeks: 1, days: 6 });
    });

    test('real-world example 4', () => {
        const age = calculateAge('2012-02-03', '2013-12-11');
        expect(age).toEqual({ years: 1, months: 10, weeks: 1, days: 1 });
    });

    test('real-world example 5', () => {
        const age = calculateAge('2012-09-17', '2013-08-31');
        expect(age).toEqual({ years: 0, months: 11, weeks: 2, days: 0 });
    });

    test('real-world example 6', () => {
        const age = calculateAge('2022-01-17', '2025-07-26');
        expect(age).toEqual({ years: 3, months: 6, weeks: 1, days: 2 });
    });

    test('real-world example 7', () => {
        const age = calculateAge('2022-03-13', '2025-01-11');
        expect(age).toEqual({ years: 2, months: 9, weeks: 4, days: 1 });
    });

    test('real-world example 7 part 2', () => {
      const age = calculateAge('2022-03-11', '2025-01-13');
      expect(age).toEqual({ years: 2, months: 10, weeks: 0, days: 2 });
  });

    test('real-world example 8', () => {
        const age = calculateAge('2022-12-26', '2024-05-30');
        expect(age).toEqual({ years: 1, months: 5, weeks: 0, days: 4 }); // cuz we add 4 days to 2022-12-26 and get 2022-12-30, then we add 5 months to it and get 2023-05-30 and then we add 1 year to it and get 2024-05-30
    });

    test('real-world example 9', () => {
        const age = calculateAge('2023-06-16', '2024-05-01');
        expect(age).toEqual({ years: 0, months: 10, weeks: 2, days: 1 }); // cuz we add 2 weeks to 2023-06-16 and get 2023-06-30 then we add 1 day to it and get 2023-07-01, then we add 10 months to it and get 2024-05-01
    });

    test('real-world example 10', () => {
        const age = calculateAge('2023-07-30', '2024-03-20');
        expect(age).toEqual({ years: 0, months: 7, weeks: 3, days: 0 }); // cuz we add 3 weeks to 2023-07-30 and get 2023-08-20, then we add 7 months to it and get 2024-03-20
    });

    test('should handle tricky case 1', () => {
      const age = calculateAge('2024-12-30', '2025-03-03');
      expect(age).toEqual({ years: 0, months: 2, weeks: 0, days: 4 }); // we add 4 days to 2024-12-30 and get 2025-01-03, then we add 2 months to it and get 2025-03-03
    });

    test('should handle tricky case 2', () => {
      const age = calculateAge('2024-12-30', '2025-02-02');
      expect(age).toEqual({ years: 0, months: 1, weeks: 0, days: 3 }); // we add 3 days to 2024-12-30 and get 2025-01-02, then we add 1 month to it and get 2025-02-02
    });

    test('should handle end of month to end of month calculation', () => {
      const age = calculateAge('2024-12-31', '2025-02-28');
      expect(age).toEqual({ years: 0, months: 1, weeks: 4, days: 0 }); // cuz there's exactly 4 weeks between 31st of December and 28th of January + 1 month from 28th of January to 28th of February
    });

    test('should handle end of month to end of month calculation in leap year', () => {
      const age = calculateAge('2023-12-31', '2024-02-29');
      expect(age).toEqual({ years: 0, months: 1, weeks: 4, days: 1 });
    });

    test('should handle end of month to end of month', () => {
      const age = calculateAge('2025-06-30', '2025-08-31');
      expect(age).toEqual({ years: 0, months: 2, weeks: 0, days: 1 }); // cuz there's exactly 2 month between 30th of June and 30th of August + 1 day from 30th of August to 31st of August
    });

    test('should handle end of month to end of month', () => {
      const age = calculateAge('2024-06-30', '2024-07-31');
      expect(age).toEqual({ years: 0, months: 1, weeks: 0, days: 1 }); // cuz there's exactly 1 month between 30th of June and 30th of July + 1 day from 30th of July to 31st of July
    });

    test('should handle end of month to end of month', () => {
      const age = calculateAge('2024-06-30', '2024-07-30');
      expect(age).toEqual({ years: 0, months: 1, weeks: 0, days: 0 }); // cuz there's exactly 1 month between 30th of June and 30th of July
    });

    test('should handle end of month to beginning of month', () => {
      const age = calculateAge('2024-12-31', '2025-03-01');
      expect(age).toEqual({ years: 0, months: 2, weeks: 0, days: 1 }); // cuz there's one day from 2024-12-31 to 2025-01-01, then 2 months from 2025-01-01 to 2025-03-01
    });
  });
});


// General logic is the following:
// If day number is the same, we just count the months between the two dates
// If day number of first date is greater than the day number of the second date, we:
//    a) add the difference to the first date until we get the first day of the next month
//    b) add months between the first day of the next month and the first day of the month from the second date
//    c) add weeks and days between the first day of the month from the second date and the second date
// If day number of first date is less than the day number of the second date, we:
//    a) add weeks and days to the first date until we get the same day number as the second date
//    b) add months and years between the month from the first date and the month from the second date
