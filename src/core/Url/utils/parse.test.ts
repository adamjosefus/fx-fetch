import { describe, expect, test } from 'vitest';
import { parse } from './parse.js';

describe('parse', () => {
  test('scheme and hostname', () => {
    const parts = parse('https://example.com');

    expect(parts.protocol).toBe('https');
    expect(parts.hostname).toBe('example.com');
    expect(parts.pathname).toBeUndefined();
    expect(parts.port).toBeUndefined();
    expect(parts.username).toBeUndefined();
    expect(parts.password).toBeUndefined();
    expect(parts.hash).toBeUndefined();
    expect(parts.searchParams).toBe('');
  });

  test('port', () => {
    const parts = parse('http://localhost:8080');

    expect(parts.hostname).toBe('localhost');
    expect(parts.port).toBe('8080');
  });

  test('pathname', () => {
    const parts = parse('https://example.com/v1/users');

    expect(parts.hostname).toBe('example.com');
    expect(parts.pathname).toBe('/v1/users');
  });

  test('userinfo', () => {
    const parts = parse('https://user:pass@example.com');

    expect(parts.username).toBe('user');
    expect(parts.password).toBe('pass');
    expect(parts.hostname).toBe('example.com');
  });

  test('username without password', () => {
    const parts = parse('https://user@example.com');

    expect(parts.username).toBe('user');
    expect(parts.password).toBeUndefined();
  });

  test('percent-encoded credentials are decoded', () => {
    const parts = parse('https://us%40er:p%3Aass@example.com');

    expect(parts.username).toBe('us@er');
    expect(parts.password).toBe('p:ass');
  });

  test('query string is returned raw (decoding is the SearchParams module job)', () => {
    const parts = parse('https://example.com/?q=hello+world&q=again&empty');

    expect(parts.searchParams).toBe('q=hello+world&q=again&empty');
  });

  test('hash', () => {
    const parts = parse('https://example.com/docs#section');

    expect(parts.pathname).toBe('/docs');
    expect(parts.hash).toBe('section');
  });

  test('everything at once', () => {
    const parts = parse('https://user:pass@example.com:8443/a/b?x=1#top');

    expect(parts.protocol).toBe('https');
    expect(parts.username).toBe('user');
    expect(parts.password).toBe('pass');
    expect(parts.hostname).toBe('example.com');
    expect(parts.port).toBe('8443');
    expect(parts.pathname).toBe('/a/b');
    expect(parts.searchParams).toBe('x=1');
    expect(parts.hash).toBe('top');
  });

  test('IPv6 host with port', () => {
    const parts = parse('http://[::1]:9000/path');

    expect(parts.hostname).toBe('[::1]');
    expect(parts.port).toBe('9000');
    expect(parts.pathname).toBe('/path');
  });

  test('IPv6 host without port', () => {
    const parts = parse('http://[2001:db8::1]/');

    expect(parts.hostname).toBe('[2001:db8::1]');
    expect(parts.port).toBeUndefined();
  });

  test('throws without a scheme', () => {
    expect(() => parse('example.com/path')).toThrow();
  });

  test('throws without a hostname', () => {
    expect(() => parse('https:///path')).toThrow();
  });
});
