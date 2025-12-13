import { SearchParamsIntermediate } from './SearchParamsIntermediate';

/**
 * @internal
 */
export interface UrlIntermediate {
  /* mutable */ hash: string | undefined;
  /* mutable */ hostname: string;
  /* mutable */ password: string | undefined;
  /* mutable */ pathname: string | undefined;
  /* mutable */ port: number | undefined;
  /* mutable */ protocol: string;
  /* mutable */ clonedSearchParams: SearchParamsIntermediate;
  /* mutable */ username: string | undefined;
}
