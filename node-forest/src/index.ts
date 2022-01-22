import "reflect-metadata";
import chalk from "chalk";

export { Bench } from "./log/@Bench";
export { LOG, BLOCK, ASSERT, forest } from "./log/Log";
export { Forest } from "./settings/Forest";
export { LevelDefault } from "./settings/declarations";
export {
  ConsoleProvider,
  FileProvider,
  RemoteProvider,
  ForestProvider,
} from "./log/Providers";
export { chalk };
