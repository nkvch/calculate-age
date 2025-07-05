import { calculateAge, getDaysInMonth, isLeapYear } from '../src';

describe('Age Calculator Utility', () => {
  
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

    test('should handle leap year February', () => {
      const result = calculateAge('2024-01-29', '2024-02-29');
      expect(result).toEqual({ years: 0, months: 1, weeks: 0, days: 0 });
    });

    test('should handle non-leap year February', () => {
      const result = calculateAge('2023-01-29', '2023-02-28');
      expect(result).toEqual({ years: 0, months: 0, weeks: 4, days: 2 });
    });

    test('should handle leap year to non-leap year February transition', () => {
        const result = calculateAge('2024-02-29', '2025-02-28');
        expect(result).toEqual({ years: 0, months: 11, weeks: 4, days: 2 });
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
  });

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

  describe('Real-world examples', () => {
    test('real-world example 1', () => {
      const age = calculateAge('2010-12-01', '2015-07-19');
      expect(age).toEqual({ years: 4, months: 7, weeks: 2, days: 4 });
    });

    test('real-world example 2', () => {
      const age = calculateAge('2011-01-06', '2015-05-04');
      expect(age).toEqual({ years: 4, months: 3, weeks: 4, days: 0 });
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

    test('real-world example 8', () => {
        const age = calculateAge('2022-12-26', '2024-05-30');
        expect(age).toEqual({ years: 1, months: 5, weeks: 0, days: 4 });
    });

    test('real-world example 9', () => {
        const age = calculateAge('2023-06-16', '2024-05-01');
        expect(age).toEqual({ years: 0, months: 10, weeks: 2, days: 1 });
    });

    test('real-world example 10', () => {
        const age = calculateAge('2023-07-30', '2024-03-20');
        expect(age).toEqual({ years: 0, months: 7, weeks: 2, days: 5 });
    });
  });
});
