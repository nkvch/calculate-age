# Age Calculator

A simple and accurate age calculation utility for JavaScript/TypeScript that calculates the precise age between two dates, accounting for leap years and varying month lengths.

## Features

- 🎯 **Accurate calculations** - Handles leap years and varying month lengths
- 📅 **Flexible date handling** - Works with any date range
- 🔢 **Detailed breakdown** - Returns years, months, weeks, and days
- 📦 **TypeScript support** - Full type definitions included
- 🪶 **Lightweight** - No dependencies
- ✅ **Well tested** - Comprehensive test suite

## Installation

```bash
npm install age-calculator-utils
```

## Usage

### Basic Usage

```typescript
import { calculateAge } from 'age-calculator-utils';

const age = calculateAge('2020-01-15', '2024-03-20');
console.log(age);
// Output: { years: 4, months: 2, weeks: 0, days: 5 }
```

### JavaScript (CommonJS)

```javascript
const { calculateAge } = require('age-calculator-utils');

const age = calculateAge('2020-01-15', '2024-03-20');
console.log(age);
// Output: { years: 4, months: 2, weeks: 0, days: 5 }
```

### Real-world Examples

```typescript
import { calculateAge } from 'age-calculator-utils';

// Calculate someone's age
const birthDate = '1990-05-15';
const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
const age = calculateAge(birthDate, today);
console.log(`Age: ${age.years} years, ${age.months} months, ${age.weeks} weeks, ${age.days} days`);

// Calculate project duration
const projectStart = '2023-01-01';
const projectEnd = '2023-12-31';
const duration = calculateAge(projectStart, projectEnd);
console.log(`Project duration: ${duration.years} years, ${duration.months} months`);

// Handle leap years correctly
const leapYearStart = '2024-02-29';
const leapYearEnd = '2025-02-28';
const leapAge = calculateAge(leapYearStart, leapYearEnd);
console.log(leapAge); // { years: 0, months: 11, weeks: 4, days: 2 }
```

## API Reference

### `calculateAge(startDate, endDate)`

Calculates the age between two dates.

**Parameters:**
- `startDate` (string): Start date in YYYY-MM-DD format
- `endDate` (string): End date in YYYY-MM-DD format

**Returns:**
- `AgeResult`: Object containing the calculated age

```typescript
interface AgeResult {
  years: number;   // Full years
  months: number;  // Additional months (0-11)
  weeks: number;   // Additional weeks (0-4)
  days: number;    // Additional days (0-6)
}
```

### `getDaysInMonth(year, month)`

Returns the number of days in a specific month, accounting for leap years.

**Parameters:**
- `year` (number): The year
- `month` (number): The month (1-12)

**Returns:**
- `number`: Number of days in the month

```typescript
getDaysInMonth(2024, 2); // 29 (leap year)
getDaysInMonth(2023, 2); // 28 (non-leap year)
getDaysInMonth(2024, 4); // 30
```

### `isLeapYear(year)`

Checks if a year is a leap year.

**Parameters:**
- `year` (number): The year to check

**Returns:**
- `boolean`: True if leap year, false otherwise

```typescript
isLeapYear(2024); // true
isLeapYear(2023); // false
isLeapYear(2000); // true
isLeapYear(1900); // false
```

## Edge Cases Handled

This library correctly handles various edge cases:

- **Leap years**: February 29th is properly handled
- **Month boundaries**: Crossing month boundaries with different day counts
- **Year boundaries**: December to January transitions
- **Short months**: February, April, June, September, November
- **Same dates**: Returns zero for all fields when dates are identical

## Examples

```typescript
// Leap year handling
calculateAge('2024-02-29', '2025-02-28');
// { years: 0, months: 11, weeks: 4, days: 2 }

// Month boundary
calculateAge('2024-01-31', '2024-02-29');
// { years: 0, months: 0, weeks: 4, days: 1 }

// Year boundary
calculateAge('2023-12-15', '2024-01-20');
// { years: 0, months: 1, weeks: 0, days: 5 }

// Same date
calculateAge('2024-01-01', '2024-01-01');
// { years: 0, months: 0, weeks: 0, days: 0 }
```

## TypeScript Support

This package is written in TypeScript and includes full type definitions. All functions and interfaces are properly typed:

```typescript
import { calculateAge, getDaysInMonth, isLeapYear, AgeResult } from 'age-calculator-utils';

const age: AgeResult = calculateAge('2020-01-01', '2024-01-01');
const days: number = getDaysInMonth(2024, 2);
const isLeap: boolean = isLeapYear(2024);
```

## Testing

The library includes comprehensive tests covering:
- Basic age calculations
- Leap year scenarios
- Month boundary cases
- Year boundary cases
- Edge cases and real-world examples

Run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Stanislau Stankevich**

- GitHub: [@nkvch](https://github.com/nkvch)
- Package: [@nkvch/age-calculator](https://www.npmjs.com/package/@nkvch/age-calculator) 