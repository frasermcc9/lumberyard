import {
  LOG,
  forest,
  RemoteProvider,
  Forest,
  ForestProvider,
} from "node-forest";

Forest.configure();
Forest.addProvider(
  new ForestProvider({
    apiKey: "38b4c609-d3cd-474e-9715-86d82e690f14",
    environment: "development",
  })
);

const LM = forest("main");
const LM2 = forest("LogController");
const LM3 = forest("HomeController");

LOG(LM, "INFO", "Hello World2");
LOG(LM, "INFO", "Hello World2");
LOG(LM2, "INFO", "Hello World2");
LOG(LM3, "INFO", "Hello World2");
LOG(LM, "INFO", "Hello World2");
LOG(LM2, "INFO", "Hello World2");
