import { Module } from "@nestjs/common";
import { DbModule } from "../db.module";
import { ProjectStoreService } from "./project-store.service";

@Module({
  imports: [DbModule],
  exports: [ProjectStoreService],
  providers: [ProjectStoreService],
})
export class ProjectStoreModule {}
