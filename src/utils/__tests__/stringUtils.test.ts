import { describe, it, expect } from 'vitest';
import {
  trimFormData,
  classNames,
} from '../stringUtils';

describe('stringUtils', () => {
  describe('trimFormData', () => {
    it('should trim all string values in an object', () => {
      const input = {
        name: '  John  ',
        email: '\ttest@example.com\n',
        message: '   Hello world   ',
      };

      const result = trimFormData(input);

      expect(result).toEqual({
        name: 'John',
        email: 'test@example.com',
        message: 'Hello world',
      });
    });

    it('should handle empty object', () => {
      const result = trimFormData({});
      expect(result).toEqual({});
    });

    it('should preserve object structure', () => {
      const input = {
        owner: '  admin  ',
        text: '  test message  ',
      };

      const result = trimFormData(input);
      expect(Object.keys(result)).toEqual(Object.keys(input));
    });
  });

  describe('classNames', () => {
    it('should combine valid class names', () => {
      expect(classNames('btn', 'primary', 'large')).toBe('btn primary large');
    });

    it('should filter out falsy values', () => {
      expect(classNames('btn', null, 'primary', undefined, '', 'large')).toBe('btn primary large');
    });

    it('should trim individual classes', () => {
      expect(classNames('  btn  ', '  primary  ')).toBe('btn primary');
    });

    it('should handle empty input', () => {
      expect(classNames()).toBe('');
      expect(classNames(null, undefined, '')).toBe('');
    });

    it('should handle single class', () => {
      expect(classNames('btn')).toBe('btn');
    });
  });
});
