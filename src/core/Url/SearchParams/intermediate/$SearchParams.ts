/**
 * @internal Represents a SearchParams.ValueElement in an intermediate representation.
 */
export type $ValueElement = string;

/**
 * @internal Represents a SearchParams.Value in an intermediate representation.
 */
export type $Value = /* mutable */ $ValueElement[];

/**
 * @internal Represents a SearchParams in an intermediate representation.
 */
export type $SearchParams = /* mutable */ Map<string, $Value>;
