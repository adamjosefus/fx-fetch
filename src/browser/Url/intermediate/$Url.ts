import type { $SearchParams } from '../SearchParams/intermediate/$SearchParams.js';

/**
 * @internal Represents a Url in an intermediate representation.
 */
export interface $Url {
  /* mutable */ hash: string | undefined;
  /* mutable */ hostname: string;
  /* mutable */ password: string | undefined;
  /* mutable */ pathname: string | undefined;
  /* mutable */ port: number | undefined;
  /* mutable */ protocol: string;
  /* mutable */ searchParams: $SearchParams;
  /* mutable */ username: string | undefined;
}
