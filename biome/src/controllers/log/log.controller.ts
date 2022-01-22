import {
  Body,
  Controller,
  Header,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Bench } from "node-forest";
import { ApiKeyGuard } from "src/auth/token/token.guard";
import { UserStoreService } from "src/db/user-store/user-store.service";
import { CreateLogDto } from "./dto/create-log.dto";
import { LogService } from "./log.service";

@Controller("log")
export class LogController {
  constructor(
    private readonly logService: LogService,
    private readonly userStore: UserStoreService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ApiKeyGuard)
  @Bench()
  async create(
    @Body() createLogDto: CreateLogDto,
    @Headers("x-api-key") apiKey: string,
  ) {
    const user = await this.userStore.getUser({ token: apiKey });

    if (!user) {
      throw new HttpException(
        "The API key provided is not valid.",
        HttpStatus.UNAUTHORIZED,
      );
    }

    this.logService.create(createLogDto, user.id);
  }
}
