export const safeParseFloat = (toParse: unknown, defaultValue: number) => {
  return typeof toParse === "string" ? parseFloat(toParse) : defaultValue;
};
