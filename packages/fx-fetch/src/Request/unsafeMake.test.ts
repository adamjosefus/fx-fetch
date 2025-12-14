import { Effect, pipe } from 'effect';
import { describe, expect, test } from 'vitest';
import * as Url from '../Url/index';
import * as Request from './index';

describe('Request.unsafeMake', () => {
  const abortSignal = new AbortController().signal;

  test('Parts', async () => {
    const parts = {
      body: 'Hello, world!',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'text/plain',
        'X-Custom-Header': 'CustomValue',
      },
      integrity: 'sha256-abcdef1234567890',
      keepalive: true,
      method: 'post',
      mode: 'no-cors',
      priority: 'high',
      redirect: 'manual',
      referrer: 'https://example.eu',
      referrerPolicy: 'strict-origin-when-cross-origin',
      signal: abortSignal,
      url: 'https://api.example.com/data',
    } as const satisfies Request.Request.Parts;

    const request = Request.unsafeMake(parts);

    const body = await Request.readText(request).pipe(Effect.runPromise);
    const cache = Request.getCache(request);
    const credentials = Request.getCredentials(request);
    const headers = Request.getHeaders(request);
    const integrity = Request.getIntegrity(request);
    const keepalive = Request.isKeepalive(request);
    const method = Request.getMethod(request);
    const mode = Request.getMode(request);
    const priority = Request.getPriority(request);
    const redirect = Request.getRedirect(request);
    const referrer = Request.getReferrer(request);
    const referrerPolicy = Request.getReferrerPolicy(request);
    const signal = Request.getSignal(request);
    const url = Request.getUrl(request);

    expect(body).toBe(parts.body);
    expect(cache).toBe(parts.cache);
    expect(credentials).toBe(parts.credentials);
    expect(pipe(headers.entries(), (entries) => Array.from(entries))).toEqual(
      pipe(parts.headers, Object.entries, (entries) =>
        entries.map(([key, value]) => [key.toLowerCase(), [value]])
      )
    );
    expect(integrity).toBe(parts.integrity);
    expect(keepalive).toBe(parts.keepalive);
    expect(method).toBe(parts.method.toUpperCase());
    expect(mode).toBe(parts.mode);
    expect(priority).toBe(parts.priority);
    expect(redirect).toBe(parts.redirect);
    expect(referrer).toBe(parts.referrer);
    expect(referrerPolicy).toBe(parts.referrerPolicy);
    expect(signal).toBeInstanceOf(AbortSignal);
    expect(Url.format(url)).toBe(parts.url);
  });
});
