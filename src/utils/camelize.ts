export const camelize = (str: string) => str.replace(/-./g, char => char.toUpperCase()[1]);
