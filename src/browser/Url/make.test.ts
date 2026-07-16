/// <reference lib="dom" />

import { Option } from 'effect';
import { describe, expect, test } from 'vitest';
import { format } from './format.js';
import { make, SearchParams, unsafeMake } from './index.js';

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

describe('Url.make', () => {
  test('minimal parts', () => {
    const url = unsafeMake({ protocol: 'https', hostname: 'Example.com' });

    expect(url._tag).toBe('Url');
    expect(url.protocol).toBe('https:');
    expect(url.hostname).toBe('example.com');
    expect(url.hash).toBeUndefined();
    expect(url.pathname).toBeUndefined();
    expect(url.port).toBeUndefined();
    expect(url.username).toBeUndefined();
    expect(url.password).toBeUndefined();
    expect(url.searchParams.size).toBe(0);
  });

  test('full parts are normalized', () => {
    const url = unsafeMake({
      protocol: 'HTTPS://',
      hostname: 'API.Example.com',
      port: '8080',
      pathname: '/v1/users/',
      hash: '#section',
      username: 'user',
      password: 'pass',
      searchParams: [
        ['q', 'hello world'],
        ['q', 'again'],
      ],
    });

    expect(url.protocol).toBe('https:');
    expect(url.hostname).toBe('api.example.com');
    expect(url.port).toBe(8080);
    expect(url.pathname).toBe('v1/users/');
    expect(url.hash).toBe('section');
    expect(url.username).toBe('user');
    expect(url.password).toBe('pass');
    expect(url.searchParams.get('q')).toEqual(['hello world', 'again']);
  });

  test('root pathname is stored as undefined', () => {
    const url = unsafeMake({ protocol: 'http', hostname: 'x.com', pathname: '/' });

    expect(url.pathname).toBeUndefined();
  });

  test('default port for the scheme is stripped', () => {
    const url = unsafeMake({ protocol: 'https', hostname: 'x.com', port: 443 });

    expect(url.port).toBeUndefined();
  });

  test('dot-segments in pathname are resolved', () => {
    const url = unsafeMake({ protocol: 'https', hostname: 'x.com', pathname: '/a/./b/../c' });

    expect(url.pathname).toBe('a/c');
  });

  test('make from existing Url clones searchParams', () => {
    const original = unsafeMake({ protocol: 'https', hostname: 'x.com', searchParams: { a: '1' } });
    const copy = unsafeMake(original);

    expect(copy.protocol).toBe('https:');
    expect(copy.hostname).toBe('x.com');
    expect(copy.searchParams.get('a')).toEqual(['1']);
    expect(copy.searchParams).not.toBe(original.searchParams);
  });

  test('make from a url string parses and normalizes', () => {
    const url = unsafeMake(
      'HTTPS://user:pass@API.Example.com:8080/v1/users/?q=hello+world#section'
    );

    expect(url.protocol).toBe('https:');
    expect(url.hostname).toBe('api.example.com');
    expect(url.port).toBe(8080);
    expect(url.pathname).toBe('v1/users/');
    expect(url.username).toBe('user');
    expect(url.password).toBe('pass');
    expect(url.searchParams.get('q')).toEqual(['hello world']);
    expect(url.hash).toBe('section');
  });

  test('make from options merges searchParams with the url query', () => {
    const url = unsafeMake({ url: 'https://x.com/?a=1', searchParams: { b: '2' } });

    expect(url.hostname).toBe('x.com');
    expect(url.searchParams.get('a')).toEqual(['1']);
    expect(url.searchParams.get('b')).toEqual(['2']);
  });

  test('make returns Option.some for valid input', () => {
    const url = make({ protocol: 'https', hostname: 'x.com' });

    expect(Option.isSome(url)).toBe(true);
  });

  test('invalid port is rejected', () => {
    expect(() => unsafeMake({ protocol: 'https', hostname: 'x.com', port: 70000 })).toThrow();
    expect(Option.isNone(make({ protocol: 'https', hostname: 'x.com', port: 70000 }))).toBe(true);
  });

  test('password without username is rejected', () => {
    expect(() =>
      unsafeMake({ protocol: 'https', hostname: 'x.com', password: 'secret' })
    ).toThrow();
    expect(Option.isNone(make({ protocol: 'https', hostname: 'x.com', password: 'secret' }))).toBe(
      true
    );
  });
});
