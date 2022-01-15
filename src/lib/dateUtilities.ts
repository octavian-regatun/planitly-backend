export function isStringValidDate(value: string): boolean {
  return !isNaN(Date.parse(value));
}
