import type { UrlIntermediate } from '../Url/UrlIntermediate';
import type { HeadersIntermediate } from '../utils/HeadersIntermediate';
import type * as localThis from '../utils/localThis';
import type { Method } from './Method';
import type { NormalizedReferrerPolicy } from './NormalizedReferrerPolicy';

/**
 * @internal Mutable intermediate representation of a Request.Request.
 */
export interface RequestIntermediate {
  /* mutable */ cache: localThis.RequestCache | undefined;
  /* mutable */ clonedBody: Promise<localThis.Blob> | undefined;
  /* mutable */ clonedHeaders: HeadersIntermediate;
  /* mutable */ credentials: localThis.RequestCredentials | undefined;
  /* mutable */ integrity: string | undefined;
  /* mutable */ keepalive: boolean;
  /* mutable */ method: Method;
  /* mutable */ mode: localThis.RequestMode | undefined;
  /* mutable */ priority: localThis.RequestPriority | undefined;
  /* mutable */ redirect: localThis.RequestRedirect | undefined;
  /* mutable */ referrer: string | undefined;
  /* mutable */ referrerPolicy: NormalizedReferrerPolicy | undefined;
  /* mutable */ clonedSignals: /* mutable */ localThis.AbortSignal[];
  /* mutable */ clonedUrl: UrlIntermediate;
}
