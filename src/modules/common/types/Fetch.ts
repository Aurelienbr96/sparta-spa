export type FetchError<T> =
  | {
      status: number;
      data?: T;
    }
  | undefined;
