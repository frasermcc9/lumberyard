import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { User } from "src/util/user.decorator";
import { DecodedIdToken } from "firebase-admin/auth";
import { AuthUser } from "src/util/types/utilityTypes";
import { Bench, forest, LOG } from "node-forest";
import { FirebaseAuthGuard } from "src/auth/firebase/firebase.guard";

const MOD = forest("ProjectController");

@Controller("project")
@UseGuards(FirebaseAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Bench()
  create(@Body() createProjectDto: CreateProjectDto, @User() user: AuthUser) {
    return this.projectService.create(createProjectDto, user.uid);
  }

  @Get()
  @Bench()
  async findAll(@User() user?: DecodedIdToken) {
    const projects = await this.projectService.findAll(user?.uid);
    return projects;
  }

  @Get(":id")
  find(@Param("id") id: string) {
    LOG(MOD, "INFO", `Getting project with ID ${id}`);
    return this.projectService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectService.remove(+id);
  }
}
