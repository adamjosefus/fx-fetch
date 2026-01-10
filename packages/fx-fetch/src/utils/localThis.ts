/**
 * Custom Web API type definitions to make this package DOM-agnostic.
 * These types reference the global types provided by @types/node (v20+).
 *
 * @internal
 */

export type AbortSignal = globalThis.AbortSignal;
export type Blob = globalThis.Blob;
export type FormData = globalThis.FormData;
export type Headers = globalThis.Headers;
export type ReadableStream<R = unknown> = globalThis.ReadableStream<R>;
export type Request = globalThis.Request;
export type Response = globalThis.Response;
export type ResponseInit = globalThis.ResponseInit;
export type URL = globalThis.URL;
export type URLSearchParams = globalThis.URLSearchParams;

// Define types that aren't directly on globalThis
export type HeadersInit = Headers | string[][] | Record<string, string>;

export type BodyInit =
  | globalThis.ArrayBuffer
  | globalThis.DataView
  | globalThis.Uint8Array
  | globalThis.Uint8ClampedArray
  | globalThis.Uint16Array
  | globalThis.Uint32Array
  | globalThis.Int8Array
  | globalThis.Int16Array
  | globalThis.Int32Array
  | globalThis.Float32Array
  | globalThis.Float64Array
  | globalThis.BigInt64Array
  | globalThis.BigUint64Array
  | globalThis.Blob
  | globalThis.FormData
  | globalThis.URLSearchParams
  | globalThis.ReadableStream<Uint8Array>
  | string;

export type RequestInit = {
  body?: BodyInit | null;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  method?: string;
  mode?: RequestMode;
  priority?: RequestPriority;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  window?: null;
};

export interface ArrayBufferView {
  readonly buffer: globalThis.ArrayBuffer;
  readonly byteLength: number;
  readonly byteOffset: number;
}

// ============================================================================
// Request Types (String Literal Unions)
// ============================================================================

export type RequestCache =
  | 'default'
  | 'no-store'
  | 'reload'
  | 'no-cache'
  | 'force-cache'
  | 'only-if-cached';

export type RequestCredentials = 'omit' | 'same-origin' | 'include';

export type RequestMode = 'navigate' | 'same-origin' | 'no-cors' | 'cors';

export type RequestRedirect = 'follow' | 'error' | 'manual';

export type RequestPriority = 'high' | 'low' | 'auto';

export type ReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'same-origin'
  | 'origin'
  | 'strict-origin'
  | 'origin-when-cross-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

// ============================================================================
// Response Types
// ============================================================================

export type ResponseType = 'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect';
