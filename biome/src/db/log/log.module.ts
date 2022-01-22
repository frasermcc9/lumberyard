import { Module } from "@nestjs/common";
import { DbModule } from "../db.module";
import { LogStoreService } from "./log.service";

@Module({
  imports: [DbModule],
  exports: [LogStoreService],
  providers: [LogStoreService],
})
export class LogStoreModule {}
