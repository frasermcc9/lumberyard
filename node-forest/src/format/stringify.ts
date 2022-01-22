import { format } from "util";

export const stringed = (...args: any[]) => {
  return format(args);
};
