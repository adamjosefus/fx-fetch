import type * as localThis from '../utils/localThis';

/**
 * @internal NormalizedReferrerPolicy excludes the empty string from ReferrerPolicy.
 */
export type NormalizedReferrerPolicy = Exclude<localThis.ReferrerPolicy, ''>;
