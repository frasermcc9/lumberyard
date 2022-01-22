export type LogLevel =
  | "DEBUG"
  | "INFO"
  | "SUCCESS"
  | "WARN"
  | "ERROR"
  | "FATAL";

export enum LevelDefault {
  DEBUG = 0,
  INFO = 1,
  SUCCESS = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5,
}

export type SelectableLogLevel = LogLevel | "OFF";
