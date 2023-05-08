export type PaginationWrapper<T> = {
  total: number;
  result: T[];
};

export type Response<T> = {
  message: string;
  data: T;
  code: number;
};

export type PruneTypePrefix<T, U extends string> = {
  [K in keyof T as K extends `${U}${infer R}` ? R : K]: T[K];
};

export type PrunedMetaEnv = PruneTypePrefix<ImportMetaEnv, "REACT_APP_">;
