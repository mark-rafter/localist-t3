export const safeParseFloat = (toParse: unknown, defaultValue: number) =>
  typeof toParse === "string" ? parseFloat(toParse) : defaultValue;
