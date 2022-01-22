import chalk, { Chalk } from "chalk";
import { ConsoleProvider } from "..";
import { LogLevel, SelectableLogLevel } from "./declarations";

export class Forest implements Provider {
  private static instance?: Forest;

  static configure(cfg: ForestConfig = {}) {
    const logger = this.get();

    if (cfg.levels) {
      logger.levels = { ...logger.levels, ...cfg.levels };
    }

    if (cfg.logLevel) {
      if (cfg.logLevel === "OFF") {
        logger.activeLevel = Infinity;
      } else {
        logger.activeLevel = logger.levels[cfg.logLevel].level;
      }
    }

    if (!cfg.disableConsoleProvider) {
      this.addProvider(new ConsoleProvider());
    }
  }

  static addProvider(provider: Provider) {
    this.get().providers.push(provider);
  }

  /** @internal */
  static get() {
    if (!this.instance) {
      this.instance = new Forest();
    }
    return this.instance;
  }

  private levels;
  private activeLevel: number;
  private providers: Provider[] = [];

  canLog(log: LogLevel) {
    return this.levels[log].level >= this.activeLevel;
  }

  getColor(log: LogLevel) {
    return this.levels[log].color;
  }

  doLog(chars: string, color: Chalk): void {
    for (let i = 0; i < this.providers.length; i++) {
      this.providers[i].doLog(chars, color);
    }
  }

  /** @internal */
  private constructor() {
    this.levels = {
      DEBUG: {
        color: chalk.white,
        level: 0,
      },
      INFO: {
        color: chalk.green,
        level: 1,
      },
      SUCCESS: {
        color: chalk.magenta,
        level: 2,
      },
      WARN: {
        color: chalk.yellow,
        level: 3,
      },
      ERROR: {
        color: chalk.red,
        level: 4,
      },
      FATAL: {
        color: chalk.bgRed.whiteBright,
        level: 5,
      },
    };
    this.activeLevel = this.levels.INFO.level;
  }
}

export interface ForestConfig {
  levels?: LogLevelList;
  logLevel?: SelectableLogLevel;
  disableConsoleProvider?: boolean;
}

export type LogLevelList = { [K in LogLevel]?: LevelConfig };

export type LevelConfig = {
  level: number;
  color: Chalk;
};

export interface Provider {
  doLog(chars: string, color: Chalk): void;
}
