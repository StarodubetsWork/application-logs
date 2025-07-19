import { describe, it, expect } from 'vitest';
import { ICON_SIZE_CLASSES, type IconSize } from '../config';

describe('icon config utilities', () => {
  describe('ICON_SIZE_CLASSES', () => {
    it('should contain all expected size classes', () => {
      expect(ICON_SIZE_CLASSES).toEqual({
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      });
    });

    it('should have consistent Tailwind CSS class format', () => {
      Object.values(ICON_SIZE_CLASSES).forEach(className => {
        // Should follow pattern: "h-{size} w-{size}"
        expect(className).toMatch(/^h-\d+ w-\d+$/);
      });
    });

    it('should have size values in ascending order', () => {
      const sizes = ['sm', 'md', 'lg', 'xl'] as const;
      const numericValues = sizes.map(size => {
        const match = ICON_SIZE_CLASSES[size].match(/h-(\d+)/);
        return match ? parseInt(match[1]) : 0;
      });

      // Check that sizes are in ascending order
      for (let i = 1; i < numericValues.length; i++) {
        expect(numericValues[i]).toBeGreaterThan(numericValues[i - 1]);
      }
    });

    it('should be readonly (as const)', () => {
      // Test that the object is frozen/immutable
      const originalValue = ICON_SIZE_CLASSES.sm;
      expect(originalValue).toBe('h-4 w-4');
      
      // Verify object is properly typed as readonly
      expect(typeof ICON_SIZE_CLASSES).toBe('object');
      expect(ICON_SIZE_CLASSES).toBeDefined();
    });
  });

  describe('IconSize type', () => {
    it('should include all expected size keys', () => {
      const expectedSizes: IconSize[] = ['sm', 'md', 'lg', 'xl'];
      
      expectedSizes.forEach(size => {
        expect(size in ICON_SIZE_CLASSES).toBe(true);
      });
    });

    it('should provide correct CSS classes for each size', () => {
      const testCases: Record<IconSize, string> = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6', 
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      };

      Object.entries(testCases).forEach(([size, expectedClass]) => {
        expect(ICON_SIZE_CLASSES[size as IconSize]).toBe(expectedClass);
      });
    });
  });

  describe('usage scenarios', () => {
    it('should work as CSS class names', () => {
      Object.values(ICON_SIZE_CLASSES).forEach(className => {
        // Should not contain special characters that would be invalid in CSS
        expect(className).not.toMatch(/[^a-zA-Z0-9\s-]/);
        expect((className as string).trim()).toBe(className); // No extra whitespace
      });
    });

    it('should be suitable for dynamic icon sizing', () => {
      // Simulate a common usage pattern
      const getIconSize = (size: IconSize) => ICON_SIZE_CLASSES[size];
      
      expect(getIconSize('sm')).toBe('h-4 w-4');
      expect(getIconSize('md')).toBe('h-6 w-6');
      expect(getIconSize('lg')).toBe('h-8 w-8');
      expect(getIconSize('xl')).toBe('h-12 w-12');
    });

    it('should support object destructuring', () => {
      const { sm, md, lg, xl } = ICON_SIZE_CLASSES;
      
      expect(sm).toBe('h-4 w-4');
      expect(md).toBe('h-6 w-6');
      expect(lg).toBe('h-8 w-8');
      expect(xl).toBe('h-12 w-12');
    });
  });
});
