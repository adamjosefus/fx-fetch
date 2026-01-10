import type { UrlIntermediate } from '../Url/UrlIntermediate';
import type { HeadersIntermediate } from '../utils/HeadersIntermediate';
import type * as localThis from '../utils/localThis';

/**
 * @internal Mutable intermediate representation of a Response.Response.
 */
export interface ResponseIntermediate {
  /* mutable */ clonedBody: Promise<localThis.Blob> | undefined;
  /* mutable */ clonedHeaders: HeadersIntermediate;
  /* mutable */ clonedUrl: UrlIntermediate | undefined;
  /* mutable */ redirected: boolean;
  /* mutable */ status: number;
  /* mutable */ statusText: string;
  /* mutable */ type: localThis.ResponseType;
}
