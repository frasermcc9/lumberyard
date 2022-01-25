import { Module } from "@nestjs/common";
import { DbService } from "./db.service";
import { ProjectStoreModule } from "./project-store/project-store.module";

@Module({
  providers: [DbService],
  exports: [DbService],
  imports: [],
})
export class DbModule {}
