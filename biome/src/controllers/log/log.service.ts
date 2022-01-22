import { HttpException, Injectable } from "@nestjs/common";
import { LogStoreService } from "src/db/log/log.service";
import { CreateLogDto } from "./dto/create-log.dto";

@Injectable()
export class LogService {
  constructor(private readonly logStore: LogStoreService) {}

  create(createLogDto: CreateLogDto, userId: string) {
    const { message } = createLogDto;

    if (
      typeof message !== "string" ||
      message.length === 0 ||
      message.length > 2047
    ) {
      throw new HttpException("Invalid message", 400);
    }

    this.logStore.insertLog(createLogDto.message, userId);
  }
}
