import { Injectable } from "@nestjs/common";
import { ProjectStoreService } from "src/db/project-store/project-store.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectService {
  constructor(private readonly projectStore: ProjectStoreService) {}

  create(createProjectDto: CreateProjectDto, userId: string) {
    return this.projectStore.createProject({
      name: createProjectDto.name,
      userId,
    });
  }

  findAll(userId?: string) {
    return this.projectStore.getProjectsForUser({ userId });
  }

  findOne(id: number) {
    return this.projectStore.getProjectById({ projectId: id });
  }

  update(id: number) {
    return this.projectStore.refreshProjectApiKey({ projectId: id });
  }

  remove(id: number) {
    return this.projectStore.deleteProject({ projectId: id });
  }
}
