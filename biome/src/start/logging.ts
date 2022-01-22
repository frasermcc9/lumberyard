import { mkdirSync, writeFile, writeFileSync } from "fs";
import { FileProvider, Forest, LOG } from "node-forest";

mkdirSync("./logs/", { recursive: true });

const now = new Date()
  .toISOString()
  .split("T")
  .join("-")
  .split(".")[0]
  .replace(/:/g, "-");

const FILE_PATH = `./logs/biome-${now}.log`;

writeFileSync(FILE_PATH, "");

Forest.configure({
  logLevel: "DEBUG",
  disableConsoleProvider: true,
});

Forest.addProvider(new FileProvider(FILE_PATH));

LOG("LOGGING", "SUCCESS", "Application started.");
