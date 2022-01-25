import { Injectable } from "@nestjs/common";
import { ExactlyOne } from "src/util/types/utilityTypes";
import { v4 } from "uuid";
import { DbService } from "../db.service";

@Injectable()
export class ProjectStoreService {
  constructor(private readonly db: DbService) {}

  async getProjectsForUser({ userId }: { userId?: string }) {
    const projects = await this.db.project.findMany({
      where: {
        ownerId: userId,
      },
    });

    return projects;
  }

  async createProject({ userId, name }: { userId: string; name: string }) {
    const project = await this.db.project.create({
      data: {
        owner: {
          connect: {
            id: userId,
          },
        },
        name,
        apiKey: v4(),
      },
    });

    return project;
  }

  async refreshProjectApiKey({ projectId }: { projectId: number }) {
    const project = await this.db.project.update({
      where: {
        id: projectId,
      },
      data: {
        apiKey: v4(),
      },
    });

    return project;
  }

  async deleteProject({ projectId }: { projectId: number }) {
    const project = await this.db.project.delete({
      where: {
        id: projectId,
      },
    });

    return project;
  }

  async getProjectById({ projectId }: ExactlyOne<{ projectId?: number }>) {
    const project = await this.db.project.findFirst({
      where: {
        id: projectId,
      },
      include: {
        logs: {
          orderBy: { createdAt: "desc" },
          take: 200,
        },
      },
    });

    return project;
  }

  async getProjectByApiKey({ apiKey }: ExactlyOne<{ apiKey?: string }>) {
    const project = await this.db.project.findFirst({
      where: {
        apiKey: apiKey,
      },
      include: {
        logs: {
          orderBy: { createdAt: "desc" },
          take: 200,
        },
      },
    });

    return project;
  }
}
