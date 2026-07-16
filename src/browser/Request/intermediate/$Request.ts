import type { $Url } from '../../Url/intermediate/$Url.js';
import type { $Headers } from '../Headers/intermediate/$Headers.js';

/**
 * @internal Represents a Request in an intermediate representation.
 */
export interface $Request {
  /* mutable */ cache: globalThis.RequestCache;
  /* mutable */ credentials: globalThis.RequestCredentials;
  /* mutable */ destination: Exclude<globalThis.RequestDestination, ''> | undefined;
  /* mutable */ headers: $Headers;
  /* mutable */ integrity: string | undefined;
  /* mutable */ keepalive: boolean;
  /* mutable */ method: string;
  /* mutable */ mode: globalThis.RequestMode;
  /* mutable */ redirect: globalThis.RequestRedirect;
  /* mutable */ referrerPolicy: Exclude<globalThis.ReferrerPolicy, ''> | undefined;
  /* mutable */ referrer: string | undefined;
  /* mutable */ url: $Url;
}
