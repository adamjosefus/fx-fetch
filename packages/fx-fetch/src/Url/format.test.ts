import { describe, expect, test } from 'vitest';
import * as Url from '.';

describe('Url.format', () => {
  test('complete URL', () => {
    const parts: Required<Url.Url.Parts> = {
      hash: '#hello-i-am-fragment',
      hostname: 'example.com',
      password: 'pass',
      pathname: '/pathname/to/resource',
      port: 8080,
      protocol: 'https:',
      searchParams: '?query=param',
      username: 'user',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString =
      'https://user:pass@example.com:8080/pathname/to/resource?query=param#hello-i-am-fragment';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('minimal URL - only protocol and hostname', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'example.com',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://example.com';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('HTTP with default port', () => {
    const parts: Url.Url.Parts = {
      protocol: 'http:',
      hostname: 'localhost',
      port: 80,
      pathname: '/api/v1',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'http://localhost:80/api/v1';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('HTTPS with default port', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'secure.example.com',
      port: 443,
      pathname: '/secure',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://secure.example.com:443/secure';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('with username only (no password)', () => {
    const parts: Url.Url.Parts = {
      protocol: 'ftp:',
      hostname: 'files.example.com',
      username: 'anonymous',
      pathname: '/pub/files',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'ftp://anonymous@files.example.com/pub/files';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('with query params only (no hash)', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'search.example.com',
      pathname: '/results',
      searchParams: '?q=test&limit=10',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://search.example.com/results?q=test&limit=10';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('with hash only (no query params)', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'docs.example.com',
      pathname: '/guide',
      hash: '#introduction',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://docs.example.com/guide#introduction';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('root path', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://example.com';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('empty pathname', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://example.com';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('custom port number', () => {
    const parts: Url.Url.Parts = {
      protocol: 'http:',
      hostname: 'localhost',
      port: 3000,
      pathname: '/dev',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'http://localhost:3000/dev';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('IP address hostname', () => {
    const parts: Url.Url.Parts = {
      protocol: 'http:',
      hostname: '192.168.1.1',
      port: 8080,
      pathname: '/admin',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'http://192.168.1.1:8080/admin';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('special characters in pathname', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/path with spaces/file%20name',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://example.com/path with spaces/file%20name';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('multiple query parameters', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'api.example.com',
      pathname: '/search',
      searchParams: '?q=javascript&lang=en&sort=date&page=1',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString =
      'https://api.example.com/search?q=javascript&lang=en&sort=date&page=1';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('complex hash fragment', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/docs',
      hash: '#section-1.2.3',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://example.com/docs#section-1.2.3';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('searchParams without leading question mark', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'api.example.com',
      pathname: '/search',
      searchParams: 'q=test&category=books',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://api.example.com/search?q=test&category=books';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('searchParams as URLSearchParams object', () => {
    const searchParams = new URLSearchParams();
    searchParams.set('query', 'hello world');
    searchParams.set('lang', 'en');

    const parts: Url.Url.Parts = {
      protocol: 'https://',
      hostname: 'search.example.com',
      searchParams: searchParams,
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://search.example.com?query=hello+world&lang=en';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('searchParams with duplicate keys', () => {
    const parts: Url.Url.Parts = {
      protocol: 'FTP:',
      hostname: 'api.example.com',
      pathname: '/filter/',
      searchParams: 'tag=javascript&tag=typescript&tag=react',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString =
      'ftp://api.example.com/filter?tag=javascript&tag=typescript&tag=react';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('pathname with trailing slash variations', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'example.com',
      pathname: 'no-leading-slash/',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://example.com/no-leading-slash';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('special characters and unicode in pathname', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/café/文档/файлы/🚀rocket',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://example.com/café/文档/файлы/🚀rocket';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('percent-encoded characters in pathname', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'example.com',
      pathname: '/path%20with%20spaces/file%2Bname%3Fquery',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString = 'https://example.com/path%20with%20spaces/file%2Bname%3Fquery';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });

  test('searchParams with special characters and emojis', () => {
    const parts: Url.Url.Parts = {
      protocol: 'https:',
      hostname: 'emoji.example.com',
      searchParams: 'emoji=🎉&message=Hello%20World!&symbols=%26%3D%3F%23',
    };

    const url = Url.unsafeMake(parts);
    const expectedUrlString =
      'https://emoji.example.com?emoji=%F0%9F%8E%89&message=Hello+World%21&symbols=%26%3D%3F%23';

    expect(Url.format(url)).toEqual(expectedUrlString);
  });
});
