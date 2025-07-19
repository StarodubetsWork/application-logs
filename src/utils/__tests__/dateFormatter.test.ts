import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { formatDateTime, formatDate, formatTime, type DateInput } from '../dateFormatter';

describe('dateFormatter utils', () => {
  // Mock date to ensure consistent test results
  const mockDate = new Date('2024-07-19T14:30:45.123Z');
  let originalDateTimeFormat: typeof Intl.DateTimeFormat;
  
  beforeEach(() => {
    // Mock Intl.DateTimeFormat for consistent test results
    originalDateTimeFormat = Intl.DateTimeFormat;
    vi.stubGlobal('Intl', {
      ...Intl,
      DateTimeFormat: vi.fn().mockImplementation((locale, options) => {
        const formatter = new originalDateTimeFormat(locale, options);
        return {
          format: (date: Date) => formatter.format(date),
          formatToParts: (date: Date) => formatter.formatToParts(date),
        };
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('formatDateTime', () => {
    it('should format Date object correctly', () => {
      const result = formatDateTime(mockDate);
      expect(result).toMatch(/Jul 19, 2024/);
      expect(result).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/);
    });

    it('should format ISO string correctly', () => {
      const isoString = '2024-07-19T14:30:45.123Z';
      const result = formatDateTime(isoString);
      expect(result).toMatch(/Jul 19, 2024/);
      expect(result).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/);
    });

    it('should format timestamp number correctly', () => {
      const timestamp = mockDate.getTime();
      const result = formatDateTime(timestamp);
      expect(result).toMatch(/Jul 19, 2024/);
      expect(result).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/);
    });

    it('should return empty string for null input', () => {
      const result = formatDateTime(null);
      expect(result).toBe('');
    });

    it('should handle invalid date strings gracefully', () => {
      const result = formatDateTime('invalid-date');
      expect(result).toMatch(/Invalid Date|NaN/);
    });

    it('should handle edge case dates', () => {
      // Test with epoch timestamp
      const epochResult = formatDateTime(0);
      expect(epochResult).toMatch(/Jan 1, 1970|Dec 31, 1969/); // Account for timezone differences

      // Test with future date - use a date that won't cross timezone boundaries
      const futureDate = new Date('2030-12-25T12:00:00.000Z');
      const futureResult = formatDateTime(futureDate);
      expect(futureResult).toMatch(/Dec 25, 2030/);
    });
  });

  describe('formatDate', () => {
    it('should format Date object correctly (date only)', () => {
      const result = formatDate(mockDate);
      expect(result).toBe('Jul 19, 2024');
      // Should not contain time information
      expect(result).not.toMatch(/\d{1,2}:\d{2}/);
    });

    it('should format ISO string correctly (date only)', () => {
      const isoString = '2024-07-19T14:30:45.123Z';
      const result = formatDate(isoString);
      expect(result).toBe('Jul 19, 2024');
    });

    it('should format timestamp number correctly (date only)', () => {
      const timestamp = mockDate.getTime();
      const result = formatDate(timestamp);
      expect(result).toBe('Jul 19, 2024');
    });

    it('should return empty string for null input', () => {
      const result = formatDate(null);
      expect(result).toBe('');
    });

    it('should handle different date formats', () => {
      // Test various date formats
      const testDates = [
        new Date('2023-01-01'),
        new Date('2023-12-31T23:59:59'),
        1672531200000, // Jan 1, 2023 timestamp
      ];

      testDates.forEach(date => {
        const result = formatDate(date);
        expect(result).toMatch(/\w{3} \d{1,2}, \d{4}/);
      });
    });
  });

  describe('formatTime', () => {
    it('should format Date object correctly (time only)', () => {
      const result = formatTime(mockDate);
      expect(result).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/);
      // Should not contain date information
      expect(result).not.toMatch(/\d{4}/);
      expect(result).not.toMatch(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/);
    });

    it('should format ISO string correctly (time only)', () => {
      const isoString = '2024-07-19T14:30:45.123Z';
      const result = formatTime(isoString);
      expect(result).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/);
    });

    it('should format timestamp number correctly (time only)', () => {
      const timestamp = mockDate.getTime();
      const result = formatTime(timestamp);
      expect(result).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/);
    });

    it('should return empty string for null input', () => {
      const result = formatTime(null);
      expect(result).toBe('');
    });

    it('should handle different times correctly', () => {
      const testTimes = [
        new Date('2024-01-01T00:00:00'), // midnight
        new Date('2024-01-01T12:00:00'), // noon
        new Date('2024-01-01T23:59:59'), // end of day
      ];

      testTimes.forEach(date => {
        const result = formatTime(date);
        expect(result).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/);
      });
    });
  });

  describe('type safety and edge cases', () => {
    it('should handle all DateInput types', () => {
      const testInputs: DateInput[] = [
        new Date(),
        '2024-07-19',
        1721394645123,
        null,
      ];

      testInputs.forEach(input => {
        expect(() => formatDateTime(input)).not.toThrow();
        expect(() => formatDate(input)).not.toThrow();
        expect(() => formatTime(input)).not.toThrow();
      });
    });

    it('should consistently return strings', () => {
      const testInputs: DateInput[] = [mockDate, mockDate.toISOString(), mockDate.getTime(), null];

      testInputs.forEach(input => {
        expect(typeof formatDateTime(input)).toBe('string');
        expect(typeof formatDate(input)).toBe('string');
        expect(typeof formatTime(input)).toBe('string');
      });
    });
  });

  describe('locale consistency', () => {
    it('should use en-US locale consistently', () => {
      const testDate = new Date('2024-07-19T14:30:45.123Z');
      
      const dateTimeResult = formatDateTime(testDate);
      const dateResult = formatDate(testDate);
      
      // Should use US date format (Month Day, Year)
      expect(dateResult).toMatch(/Jul 19, 2024/);
      expect(dateTimeResult).toContain('Jul 19, 2024');
    });
  });
});
