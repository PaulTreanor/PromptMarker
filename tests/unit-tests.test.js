import { expect, test} from 'vitest'
import sanitizeStringForJS from '../src/utils'

// Test if function sanitises inputs correctly
test('should sanitize simple strings', () => {
    expect(sanitizeStringForJS('hello')).toBe('\\u0068\\u0065\\u006c\\u006c\\u006f');
});

test('should handle an empty string', () => {
    expect(sanitizeStringForJS('')).toBe('');
});

test('should sanitize strings with potentially dangerous characters', () => {
    expect(sanitizeStringForJS('<script>')).toBe('\\u003c\\u0073\\u0063\\u0072\\u0069\\u0070\\u0074\\u003e');
});

test('should sanitize multi-byte characters correctly', () => {
    expect(sanitizeStringForJS('😀')).toBe('\\ud83d\\ude00');
});