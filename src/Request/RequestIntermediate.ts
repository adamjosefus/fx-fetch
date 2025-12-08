import { UrlIntermediate } from '../Url/UrlIntermediate';
import { HeadersIntermediate } from '../utils/HeadersIntermediate';
import { Method } from './Method';
import { NormalizedReferrerPolicy } from './NormalizedReferrerPolicy';

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
