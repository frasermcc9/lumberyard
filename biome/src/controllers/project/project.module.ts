import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { ProjectStoreModule } from "src/db/project-store/project-store.module";

@Module({
  imports: [ProjectStoreModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
