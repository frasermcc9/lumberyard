import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DbService } from "../db.service";
import { v4 } from "uuid";
import { ExactlyOne } from "src/util/types/utilityTypes";

@Injectable()
export class UserStoreService {
  constructor(private readonly db: DbService) {}

  async findOrCreate({ id }: { id?: string }) {
    if (!id) return;

    const user = await this.db.user.upsert({
      where: {
        id,
      },
      create: {
        id,
      },
      update: {},
    });

    return user;
  }

  async createUser(userId: string) {
    const user = await this.db.user.create({
      data: {
        id: userId,
      },
    });
  }
}
