type Primitive = string | number | undefined;

/**
 * @internal Represents a value that can be used as a search parameter.
 */
export type SearchParamValueInput = Primitive | readonly Primitive[];
