import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigModule } from "@nestjs/config";

import "./start/validate-env";
import "./start/logging";
import { forest, LOG } from "node-forest";

const MOD = forest("Main");

async function bootstrap() {
  LOG(MOD, "INFO", `Starting server on ${process.env.PORT}`);
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT);
}

bootstrap();
