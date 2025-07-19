export const trimFormData = <T extends Record<string, string>>(data: T): T => {
  const trimmed = {} as T;
  for (const [key, value] of Object.entries(data)) {
    trimmed[key as keyof T] = (value?.trim() || '') as T[keyof T];
  }
  return trimmed;
};

export const classNames = (...classes: (string | undefined | null)[]): string => {
  return classes
    .filter(Boolean)
    .map(cls => cls?.trim())
    .filter(Boolean)
    .join(' ');
};
