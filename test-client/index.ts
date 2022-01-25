import {
  LOG,
  forest,
  RemoteProvider,
  Forest,
  ForestProvider,
} from "node-forest";

Forest.configure({ logLevel: "DEBUG" });
Forest.addProvider(
  new ForestProvider({
    apiKey: "9b94b08a-76c4-4c8d-a925-600e58c8c166",
    environment: "development",
  })
);

const LM = forest("main");
const LM2 = forest("LogController");
const LM3 = forest("HomeController");

LOG(
  LM,
  "INFO",
  "Hello World2 this is a longer log message and it will keep on going!"
);
LOG(LM, "ERROR", "Hello World2");
LOG(LM2, "DEBUG", "Hello World2");
LOG(LM3, "WARN", "Hello World2");
LOG(LM, "SUCCESS", "Hello World2");
// LOG(LM2, "FATAL", "Hello World2");
