# Forest

Forest is a simple NodeJs logging library.

## API

```ts
import {
  ASSERT,
  Bench,
  BLOCK,
  chalk,
  Forest,
  forest,
  LevelDefault,
  LOG,
} from "node-forest";

main();

async function main() {

  // Not needed, there are sensible defaults
  Forest.configure({
    // the minimum level to log
    logLevel: "INFO",
    // will disable the default behaviour of logging to the console 
    disableConsoleProvider: false // default: false
  });

  const LMOD = forest("Main");

  LOG(LMOD, "DEBUG", "This is a DEBUG message");
  LOG(LMOD, "INFO", "This is a INFO message");
  LOG(LMOD, "SUCCESS", "This is a SUCCESS message");
  LOG(LMOD, "WARN", "This is a WARN message");

  // Will print stack trace
  LOG(LMOD, "ERROR", "This is a ERROR message");
  // Will crash application
  LOG(LMOD, "FATAL", "This is a FATAL message");

  BLOCK("Block Text", chalk.cyan);

  ASSERT(LMOD, 1 == 1);

  class Timed {
    @Bench({
      level: "INFO", // default = "INFO"
      logModule: "Timed", // default = class name
      waitAsync: true, // default = true
    })
    async longMethod() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // will print "longMethod(args) => result in 1000 ms."
  await new Timed().longMethod();

  // Custom colors and levels
  Forest.configure({
    levels: {
      INFO: {
        color: chalk.cyan,
        level: LevelDefault.INFO,
      },
    },
  });

  // will now be blue
  await new Timed().longMethod();


  // FileProvider will log to a file (i.e. forest.log)
  Forest.addProvider(new FileProvider("forest.log"));
    
}
```
