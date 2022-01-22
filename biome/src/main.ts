import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import "./start/validate-env";
import "./start/logging";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT);
}

bootstrap();
