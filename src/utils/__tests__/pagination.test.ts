import { describe, it, expect } from 'vitest';
import {
  calculateTotalPages,
  calculateStartIndex,
  calculateEndIndex,
  isValidPage,
  getPaginatedData,
} from '../paginationUtils';

describe('pagination utilities', () => {
  describe('calculateTotalPages', () => {
    it('should calculate total pages correctly', () => {
      expect(calculateTotalPages(0, 10)).toBe(0);
      expect(calculateTotalPages(5, 10)).toBe(1);
      expect(calculateTotalPages(10, 10)).toBe(1);
      expect(calculateTotalPages(11, 10)).toBe(2);
      expect(calculateTotalPages(25, 10)).toBe(3);
    });

    it('should handle edge cases', () => {
      expect(calculateTotalPages(1, 1)).toBe(1);
      expect(calculateTotalPages(0, 1)).toBe(0);
      expect(calculateTotalPages(100, 1)).toBe(100);
    });
  });

  describe('calculateStartIndex', () => {
    it('should calculate start index correctly', () => {
      expect(calculateStartIndex(1, 10)).toBe(0);  // First page
      expect(calculateStartIndex(2, 10)).toBe(10); // Second page
      expect(calculateStartIndex(3, 10)).toBe(20); // Third page
    });

    it('should work with different page sizes', () => {
      expect(calculateStartIndex(1, 5)).toBe(0);
      expect(calculateStartIndex(2, 5)).toBe(5);
      expect(calculateStartIndex(3, 5)).toBe(10);
    });
  });

  describe('calculateEndIndex', () => {
    it('should calculate end index correctly', () => {
      expect(calculateEndIndex(0, 10)).toBe(10);
      expect(calculateEndIndex(10, 10)).toBe(20);
      expect(calculateEndIndex(20, 10)).toBe(30);
    });
  });

  describe('isValidPage', () => {
    it('should validate page numbers correctly', () => {
      expect(isValidPage(1, 5)).toBe(true);
      expect(isValidPage(3, 5)).toBe(true);
      expect(isValidPage(5, 5)).toBe(true);
      
      expect(isValidPage(0, 5)).toBe(false);
      expect(isValidPage(-1, 5)).toBe(false);
      expect(isValidPage(6, 5)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidPage(1, 0)).toBe(false); // No pages
      expect(isValidPage(1, 1)).toBe(true);  // Single page
    });
  });

  describe('getPaginatedData', () => {
    const testData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

    it('should return correct page data', () => {
      const page1 = getPaginatedData(testData, 1, 10);
      expect(page1).toHaveLength(10);
      expect(page1[0].id).toBe(1);
      expect(page1[9].id).toBe(10);

      const page2 = getPaginatedData(testData, 2, 10);
      expect(page2).toHaveLength(10);
      expect(page2[0].id).toBe(11);
      expect(page2[9].id).toBe(20);

      const page3 = getPaginatedData(testData, 3, 10);
      expect(page3).toHaveLength(5); // Last page with remaining items
      expect(page3[0].id).toBe(21);
      expect(page3[4].id).toBe(25);
    });

    it('should handle empty data', () => {
      const result = getPaginatedData([], 1, 10);
      expect(result).toEqual([]);
    });

    it('should handle single item pages', () => {
      const result = getPaginatedData(testData, 1, 1);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('should handle oversized pages', () => {
      const result = getPaginatedData(testData, 1, 100);
      expect(result).toHaveLength(25); // All data fits in one page
      expect(result[0].id).toBe(1);
      expect(result[24].id).toBe(25);
    });
  });

  describe('integration scenarios', () => {
    it('should work together for complete pagination', () => {
      const data = Array.from({ length: 23 }, (_, i) => ({ value: i }));
      const itemsPerPage = 10;
      const totalPages = calculateTotalPages(data.length, itemsPerPage);
      
      expect(totalPages).toBe(3);

      // Test each page
      for (let page = 1; page <= totalPages; page++) {
        expect(isValidPage(page, totalPages)).toBe(true);
        
        const pageData = getPaginatedData(data, page, itemsPerPage);
        const expectedLength = page === 3 ? 3 : 10; // Last page has 3 items
        expect(pageData).toHaveLength(expectedLength);
      }

      // Test invalid pages
      expect(isValidPage(0, totalPages)).toBe(false);
      expect(isValidPage(4, totalPages)).toBe(false);
    });

    it('should handle boundary conditions', () => {
      // Test with exactly one full page
      const onePageData = Array.from({ length: 10 }, (_, i) => i);
      const totalPages = calculateTotalPages(onePageData.length, 10);
      expect(totalPages).toBe(1);
      
      const firstPage = getPaginatedData(onePageData, 1, 10);
      expect(firstPage).toHaveLength(10);
      
      // Test with zero items
      const emptyData: number[] = [];
      const emptyTotalPages = calculateTotalPages(emptyData.length, 10);
      expect(emptyTotalPages).toBe(0);
      
      const emptyPage = getPaginatedData(emptyData, 1, 10);
      expect(emptyPage).toHaveLength(0);
    });
  });
});
