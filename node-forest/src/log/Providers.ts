import { Chalk } from "chalk";
import { WriteStream, createWriteStream } from "fs";
import { Provider } from "../settings/Forest";
import fetch from "isomorphic-unfetch";

export class ConsoleProvider implements Provider {
  doLog(chars: string, color: Chalk) {
    console.log(color(chars));
  }
}

export class FileProvider implements Provider {
  private stream?: WriteStream;

  constructor(filename: string = "application.log") {
    this.stream = createWriteStream(filename);
  }

  doLog(chars: string, color: Chalk): void {
    this.stream?.write(chars + "\n");
  }
}

interface RemoteProviderOptions {
  /** The method ie GET or POST */
  method?: string;
  /** How the message body should be generated from the raw log line. (Should
   * return an object that has been JSON.stringified) */
  processor?: (log: string) => string;

  /** A value to be passed to the X-API-Key header */
  apiKey?: string;
}

export class RemoteProvider implements Provider {
  private readonly endpoint: string;
  private readonly method: string;
  private readonly processor: (log: string) => string;
  private readonly apiKey: string;

  constructor(
    endpoint: string,
    {
      apiKey = "",
      method = "POST",
      processor = (s) => JSON.stringify({ message: s }),
    }: RemoteProviderOptions = {}
  ) {
    this.endpoint = endpoint;
    this.method = method;
    this.processor = processor;
    this.apiKey = apiKey;
  }

  doLog(chars: string): void {
    const processedLog = this.processor(chars);

    if (typeof processedLog !== "string") {
      throw new Error(
        `The processor function must return a string. Got ${typeof processedLog}`
      );
    }

    fetch(this.endpoint, {
      method: this.method,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey,
      },
      body: processedLog,
    });
  }
}

type Environment = "production" | "development";

const DEV_URL = "http://localhost:8080/log";
const PROD_URL = "https://node-forest.xyz/log";

const getUrl = (environment: Environment) => {
  if (environment === "production") {
    return PROD_URL;
  }

  return DEV_URL;
};

export class ForestProvider extends RemoteProvider {
  constructor({
    apiKey,
    environment = "production",
  }: {
    apiKey: string;
    environment: Environment;
  }) {
    super(getUrl(environment), {
      method: "POST",
      processor: (log) => {
        return JSON.stringify({ message: log });
      },
      apiKey,
    });
  }
}
