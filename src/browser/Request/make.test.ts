import { Option } from 'effect';
import { describe, expect, test } from 'vitest';
import { make, unsafeMake } from './make.js';

describe('Request.make', () => {
  test('a bare string is used as the url; method defaults to GET', () => {
    const request = unsafeMake('https://example.com');

    expect(request.method).toBe('GET');
    expect(request.url.hostname).toBe('example.com');
    expect(request.keepalive).toBe(false);
    expect(request.headers).toEqual(new Map());
  });

  test('make returns Some for a valid input', () => {
    const request = make('https://example.com');

    expect(Option.isSome(request)).toBe(true);
  });

  test('method is normalized (trimmed + uppercased)', () => {
    const request = unsafeMake({ url: 'https://example.com', method: '  post  ' });

    expect(request.method).toBe('POST');
  });

  test('the new QUERY method is accepted', () => {
    const request = unsafeMake({ url: 'https://example.com', method: 'query' });

    expect(request.method).toBe('QUERY');
  });

  test('a custom (unknown) method is allowed, not rejected', () => {
    const request = make({ url: 'https://example.com', method: 'FOOBAR' });

    expect(Option.isSome(request)).toBe(true);
    expect(Option.getOrThrow(request).method).toBe('FOOBAR');
  });

  test('an empty method falls back to GET', () => {
    const request = unsafeMake({ url: 'https://example.com', method: '   ' });

    expect(request.method).toBe('GET');
  });

  test('headers are stored with lowercased keys', () => {
    const request = unsafeMake({
      url: 'https://example.com',
      headers: { 'X-Custom': '1', 'Content-Type': 'application/json' },
    });

    expect(request.headers.get('x-custom')).toEqual(['1']);
    expect(request.headers.get('content-type')).toEqual(['application/json']);
  });

  test('Options.searchParams are merged into the url', () => {
    const request = unsafeMake({
      url: 'https://example.com/?a=1',
      searchParams: { b: '2' },
    });

    expect(request.url.searchParams.get('a')).toEqual(['1']);
    expect(request.url.searchParams.get('b')).toEqual(['2']);
  });

  test('fetch metadata fields are carried through', () => {
    const request = unsafeMake({
      url: 'https://example.com',
      cache: 'no-store',
      credentials: 'include',
      redirect: 'manual',
      keepalive: true,
    });

    expect(request.cache).toBe('no-store');
    expect(request.credentials).toBe('include');
    expect(request.redirect).toBe('manual');
    expect(request.keepalive).toBe(true);
  });

  test("referrerPolicy empty string normalizes to 'no-referrer'", () => {
    const request = unsafeMake({ url: 'https://example.com', referrerPolicy: '' });

    expect(request.referrerPolicy).toBe('no-referrer');
  });

  test('make returns None for an invalid url', () => {
    const request = make('not-a-url');

    expect(Option.isNone(request)).toBe(true);
  });

  test('unsafeMake throws for an invalid url', () => {
    expect(() => unsafeMake('not-a-url')).toThrow();
  });

  test('an existing Request is rebuilt into an independent copy', () => {
    const original = unsafeMake({ url: 'https://example.com', headers: { a: '1' } });
    const copy = unsafeMake(original);

    expect(copy.headers.get('a')).toEqual(['1']);
    expect(copy.headers).not.toBe(original.headers);
    expect(copy.url).not.toBe(original.url);
  });
});
