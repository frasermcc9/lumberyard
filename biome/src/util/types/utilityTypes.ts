export type ExactlyOne<Type, Keys extends keyof Type = keyof Type> = Pick<
  Type,
  Exclude<keyof Type, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<Type, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];
