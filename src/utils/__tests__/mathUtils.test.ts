import { describe, it, expect } from 'vitest';
import {
  calculateMaxPageAfterDeletion,
} from '../mathUtils';

describe('mathUtils', () => {
  describe('calculateMaxPageAfterDeletion', () => {
    it('should return 1 for empty data', () => {
      expect(calculateMaxPageAfterDeletion(0, 10, 5)).toBe(1);
    });

    it('should return max page when current page exceeds bounds', () => {
      expect(calculateMaxPageAfterDeletion(15, 10, 5)).toBe(2); // 15 items, 10 per page = 2 pages max, current page 5 should go to 2
    });

    it('should keep current page when within bounds', () => {
      expect(calculateMaxPageAfterDeletion(25, 10, 2)).toBe(2); // 25 items, 10 per page = 3 pages max, current page 2 stays
    });

    it('should handle edge cases', () => {
      expect(calculateMaxPageAfterDeletion(10, 10, 1)).toBe(1); // Exactly 1 page
      expect(calculateMaxPageAfterDeletion(20, 10, 2)).toBe(2); // Exactly 2 pages
    });
  });
});
