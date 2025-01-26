export type Response<T, U> = {
  data: {
    attributes: T;
    relationships: U;
  }
}

export type Status = "public" | "private";