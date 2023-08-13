export const isDefined = <T>(value: T | undefined | null): value is T => {
	return value !== undefined && value !== null;
};

export const isUnDefined = <T>(value: T | undefined | null): value is undefined | null =>
	isDefined(value) === false;
