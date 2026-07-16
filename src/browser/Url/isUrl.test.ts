import { describe, expect, test } from 'vitest';
import { isUrl } from './isUrl.js';
import { unsafeMake } from './make.js';
import { TypeId } from './Url.js';

describe('isUrl', () => {
  test('returns true for a Url', () => {
    const url = unsafeMake({ protocol: 'https', hostname: 'example.com' });

    expect(isUrl(url)).toBe(true);
  });

  test('returns false for non-objects', () => {
    expect(isUrl(null)).toBe(false);
    expect(isUrl(undefined)).toBe(false);
    expect(isUrl('https://example.com')).toBe(false);
    expect(isUrl(42)).toBe(false);
    expect(isUrl(true)).toBe(false);
  });

  test('returns false for plain objects and arrays', () => {
    expect(isUrl({})).toBe(false);
    expect(isUrl([])).toBe(false);
    expect(isUrl({ protocol: 'https:', hostname: 'example.com' })).toBe(false);
  });

  test('guard is structural — any object carrying the TypeId passes', () => {
    expect(isUrl({ [TypeId]: TypeId })).toBe(true);
  });
});
