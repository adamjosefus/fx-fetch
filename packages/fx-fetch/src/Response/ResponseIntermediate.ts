import type { UrlIntermediate } from '../Url/UrlIntermediate';
import type { HeadersIntermediate } from '../utils/HeadersIntermediate';

/**
 * @internal Mutable intermediate representation of a Response.Response.
 */
export interface ResponseIntermediate {
  /* mutable */ clonedBody: Promise<Blob> | undefined;
  /* mutable */ clonedHeaders: HeadersIntermediate;
  /* mutable */ clonedUrl: UrlIntermediate | undefined;
  /* mutable */ redirected: boolean;
  /* mutable */ status: number;
  /* mutable */ statusText: string;
  /* mutable */ type: globalThis.ResponseType;
}
