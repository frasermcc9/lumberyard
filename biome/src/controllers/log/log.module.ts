import { Module } from "@nestjs/common";
import { ApiKeyStrategy } from "src/auth/token/token.auth";
import { LogStoreModule } from "src/db/log/log.module";
import { ProjectStoreModule } from "src/db/project-store/project-store.module";
import { UserStoreModule } from "src/db/user-store/user-store.module";
import { LogController } from "./log.controller";
import { LogService } from "./log.service";

@Module({
  imports: [LogStoreModule, UserStoreModule, ProjectStoreModule],
  controllers: [LogController],
  providers: [LogService, ApiKeyStrategy],
})
export class LogModule {}
