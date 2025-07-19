export const calculateTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const calculateStartIndex = (currentPage: number, itemsPerPage: number): number => {
  return (currentPage - 1) * itemsPerPage;
};

export const calculateEndIndex = (startIndex: number, itemsPerPage: number): number => {
  return startIndex + itemsPerPage;
};

export const isValidPage = (page: number, totalPages: number): boolean => {
  return page >= 1 && page <= totalPages;
};

export const getPaginatedData = <T>(data: T[], currentPage: number, itemsPerPage: number): T[] => {
  const startIndex = calculateStartIndex(currentPage, itemsPerPage);
  const endIndex = calculateEndIndex(startIndex, itemsPerPage);
  return data.slice(startIndex, endIndex);
};
