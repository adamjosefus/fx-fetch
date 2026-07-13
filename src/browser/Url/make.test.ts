/// <reference lib="dom" />

import { describe, expect, test } from 'vitest';
import { format } from '../../core/Url/format.js';
import { SearchParams, unsafeMake } from './index.js';

describe('browser Url runtime', () => {
  test('accepts a native URL', () => {
    const url = unsafeMake(new URL('https://x.com/a/'));

    expect(format(url)).toBe('https://x.com/a/');
  });

  test('accepts a native URLSearchParams nested in options', () => {
    const url = unsafeMake({
      url: 'https://x.com',
      searchParams: new URLSearchParams('a=1&a=2'),
    });

    expect(url.searchParams.get('a')).toEqual(['1', '2']);
  });

  test('SearchParams.make accepts a native URLSearchParams', () => {
    const searchParams = SearchParams.make(new URLSearchParams('a=1&b=2'));

    expect(searchParams.get('a')).toEqual(['1']);
    expect(searchParams.get('b')).toEqual(['2']);
  });

  test('SearchParams.make accepts a query string', () => {
    const searchParams = SearchParams.make('a=1&a=2&b=3');

    expect(searchParams.get('a')).toEqual(['1', '2']);
    expect(searchParams.get('b')).toEqual(['3']);
  });
});
