export interface ITableHeading<T extends Record<string, any>> {
  key: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}
