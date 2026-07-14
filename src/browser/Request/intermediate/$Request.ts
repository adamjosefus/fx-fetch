import type { $Url } from '../../Url/intermediate/$Url.js';
import type { $Headers } from '../Headers/intermediate/$Headers.js';
import type { Method } from '../Method.js';
import type {
  NormalizedReferrerPolicy,
  RequestCache,
  RequestCredentials,
  RequestMode,
  RequestPriority,
  RequestRedirect,
} from '../Request.js';

/**
 * @internal Represents a Request in an intermediate representation.
 */
export interface $Request {
  /* mutable */ cache: RequestCache | undefined;
  /* mutable */ credentials: RequestCredentials | undefined;
  /* mutable */ headers: $Headers;
  /* mutable */ integrity: string | undefined;
  /* mutable */ keepalive: boolean;
  /* mutable */ method: Method;
  /* mutable */ mode: RequestMode | undefined;
  /* mutable */ priority: RequestPriority | undefined;
  /* mutable */ redirect: RequestRedirect | undefined;
  /* mutable */ referrer: string | undefined;
  /* mutable */ referrerPolicy: NormalizedReferrerPolicy | undefined;
  /* mutable */ url: $Url;
}
