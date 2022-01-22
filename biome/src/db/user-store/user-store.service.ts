import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DbService } from "../db.service";
import { v4 } from "uuid";
import { ExactlyOne } from "src/util/types/utilityTypes";

@Injectable()
export class UserStoreService {
  constructor(private readonly db: DbService) {}

  async getUser({ id, token }: ExactlyOne<{ id?: string; token?: string }>) {
    const user = await this.db.user.findFirst({
      where: {
        OR: [{ id }, { apiKey: token }],
      },
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async upsertUser(oauthId: string) {
    await this.db.user.upsert({
      create: {
        apiKey: v4(),
        id: oauthId,
      },
      update: {
        id: oauthId,
        apiKey: v4(),
      },
      where: {
        id: oauthId,
      },
    });
  }
}
