export type OmitCommon<T> = Omit<
  T,
  'validate' | 'get' | 'set' | 'update' | 'init' | 'parse'
>;
