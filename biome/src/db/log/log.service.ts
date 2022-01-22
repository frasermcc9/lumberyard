import { Injectable } from "@nestjs/common";
import { DbService } from "../db.service";

@Injectable()
export class LogStoreService {
  constructor(private readonly db: DbService) {}

  async insertLog(logMessage: string, userId?: string) {
    const log = await this.db.log.create({
      data: {
        message: logMessage,
        userId,
      },
    });

    return log;
  }
}
