/// <reference lib="dom" />

import { describe, expect, test } from 'vitest';
import { format } from './format.js';
import { unsafeMake } from './make.js';

// oracle = the native URL constructor, mirroring formatByReference (URLSearchParams)
// in SearchParams/format.test.ts. globalThis.URL computes the expected value and we
// compare our implementation against it.
//
// Parity is asserted on `format(...)` output, not on the internal representation:
// the stored `pathname` intentionally drops its leading/trailing slashes, so it
// does not equal `new URL(...).pathname`.
function hrefByReference(input: string): string {
  return new globalThis.URL(input).href;
}

describe('Url.format', () => {
  test('scheme and hostname', () => {
    const input = 'https://example.com';

    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });

  test('empty path is stored as undefined and formatted as a single slash', () => {
    const input = 'https://example.com';

    expect(unsafeMake(input).pathname).toBeUndefined();
    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });

  test('default port is stripped', () => {
    const inputs = [
      'https://example.com:443/path',
      'http://example.com:80/path',
      'ws://example.com:80/',
      'wss://example.com:443/',
      'ftp://example.com:21/',
    ] as const;

    for (const input of inputs) {
      expect(unsafeMake(input).port).toBe(undefined);
      expect(format(unsafeMake(input))).toBe(hrefByReference(input));
    }
  });

  test('non-default port is kept', () => {
    const input = 'http://localhost:8080/path';

    expect(unsafeMake(input).port).toBe(new globalThis.URL(input).port === '' ? undefined : 8080);
    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });

  test('hostname is lowercased', () => {
    const input = 'https://API.Example.COM/path';

    expect(unsafeMake(input).hostname).toBe(new globalThis.URL(input).hostname);
    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });

  test('trailing slash is preserved', () => {
    const input = 'https://example.com/v1/users/';

    // Stored without the leading slash, but the trailing slash is kept.
    expect(unsafeMake(input).pathname).toBe('v1/users/');
    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });

  test('dot segments in path are resolved', () => {
    const inputs = [
      'https://example.com/a/./b/../c',
      'https://example.com/a/b/../../d',
      'https://example.com/./',
    ] as const;

    for (const input of inputs) {
      expect(format(unsafeMake(input))).toBe(hrefByReference(input));
    }
  });

  test('special characters in path are percent-encoded', () => {
    const input = 'https://example.com/a b/č?x=1';

    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });

  test('query string round-trips', () => {
    const input = 'https://example.com/?q=hello+world&q=again&empty=';

    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });

  test('hash is preserved', () => {
    const input = 'https://example.com/docs#section';

    expect(unsafeMake(input).hash).toBe(new globalThis.URL(input).hash.slice(1));
    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });

  test('userinfo is preserved', () => {
    const input = 'https://user:pass@example.com/path';

    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });

  test('IPv6 host with port', () => {
    const input = 'http://[::1]:9000/path';

    expect(unsafeMake(input).hostname).toBe(new globalThis.URL(input).hostname);
    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });

  test('everything at once', () => {
    const input = 'https://user:pass@API.Example.com:8443/a/./b/../c?x=1&y=2#top';

    expect(format(unsafeMake(input))).toBe(hrefByReference(input));
  });
});
