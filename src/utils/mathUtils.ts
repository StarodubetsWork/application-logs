export const calculateMaxPageAfterDeletion = (
  remainingItems: number,
  itemsPerPage: number,
  currentPage: number
): number => {
  const maxPage = Math.ceil(remainingItems / itemsPerPage);
  
  if (remainingItems === 0) return 1;
  if (currentPage > maxPage && maxPage > 0) return maxPage;
  
  return currentPage;
};
