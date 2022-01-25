import chalk, { Chalk } from "chalk";
import { stringed } from "../format/stringify";
import { LogLevel } from "../settings/declarations";
import { Forest } from "../settings/Forest";
import { textSync } from "figlet";

const config = Forest.get();

export function ASSERT(logModule: string, condition: boolean) {
  if (!condition) {
    LOG(logModule, "ERROR", "Assertion failed");
  }
}

let MAX_LEVEL_PAD = 8;
let MAX_MODULE_PAD = 8;
let TIME_LENGTH = 11;

export function forest(name: string) {
  MAX_MODULE_PAD = Math.max(MAX_MODULE_PAD, name.length + 1);
  return name.toUpperCase();
}

export function LOG<T extends LogLevel>(
  logModule: string,
  level: T,
  ...args: any[]
) {
  if (!config.canLog(level)) {
    return;
  }

  const asString = stringed(...args)
    .slice(1, -1)
    .trim();

  const time = new Date().toLocaleTimeString();
  const timePad = " ".repeat(TIME_LENGTH - time.length);

  const requiredLevelPad = Math.max(0, MAX_LEVEL_PAD - level.length);
  const levelPad = " ".repeat(requiredLevelPad);

  const requiredModulePad = Math.max(0, MAX_MODULE_PAD - logModule.length);
  const modulePad = " ".repeat(requiredModulePad);

  const logBuilder = `[${time}]${timePad} [${level}]${levelPad}[${logModule}]${modulePad}${asString}`;
  const color = config.getColor(level);

  doLog(logBuilder, color);

  if (level === "FATAL" || level === "ERROR") {
    doStackTrace();
    if (level === "FATAL") {
      console.log(
        chalk.whiteBright.bgRed.bold(
          "This is a fatal error. Terminating application in 200ms."
        )
      );
      setTimeout(() => {
        process.exit(1);
      }, 200);
    }
  }
}

export function BLOCK(text: string, color: Chalk = chalk.whiteBright) {
  doLog(textSync(text), color);
}

function doStackTrace(color: Chalk = chalk.yellow) {
  const text = Error().stack?.split("\n").slice(3).join("\n") ?? "";
  doLog(text, color);
}

function doLog(chars: string, color: Chalk) {
  config.doLog(chars, color);
}
