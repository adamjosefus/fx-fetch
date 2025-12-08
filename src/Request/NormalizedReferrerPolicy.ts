/**
 * @internal NormalizedReferrerPolicy excludes the empty string from ReferrerPolicy.
 */
export type NormalizedReferrerPolicy = Exclude<globalThis.ReferrerPolicy, ''>;
