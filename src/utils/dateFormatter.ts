export type DateInput = Date | string | number | null;

export const formatDateTime = (value: DateInput): string => {
  if (value === null) return '';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDate = (value: DateInput): string => {
  if (value === null) return '';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (value: DateInput): string => {
  if (value === null) return '';
  return new Date(value).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
