import type { UrlIntermediate } from '../Url/UrlIntermediate';
import type { HeadersIntermediate } from '../utils/HeadersIntermediate';
import type { Method } from './Method';
import type { NormalizedReferrerPolicy } from './NormalizedReferrerPolicy';

/**
 * @internal Mutable intermediate representation of a Request.Request.
 */
export interface RequestIntermediate {
  /* mutable */ cache: RequestCache | undefined;
  /* mutable */ clonedBody: Promise<Blob> | undefined;
  /* mutable */ clonedHeaders: HeadersIntermediate;
  /* mutable */ credentials: RequestCredentials | undefined;
  /* mutable */ integrity: string | undefined;
  /* mutable */ keepalive: boolean;
  /* mutable */ method: Method;
  /* mutable */ mode: RequestMode | undefined;
  /* mutable */ priority: RequestPriority | undefined;
  /* mutable */ redirect: RequestRedirect | undefined;
  /* mutable */ referrer: string | undefined;
  /* mutable */ referrerPolicy: NormalizedReferrerPolicy | undefined;
  /* mutable */ clonedSignals: /* mutable */ AbortSignal[];
  /* mutable */ clonedUrl: UrlIntermediate;
}
