import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FirebaseAuthGuard } from "./auth/firebase/firebase.guard";
import { ApiKeyGuard } from "./auth/token/token.guard";

@Controller()
export class AppController {
  @Get("/version")
  public version(): string {
    return "1.0.0";
  }

  @Get("versionauth")
  @UseGuards(ApiKeyGuard)
  public versionAuth(): string {
    return "1.0.0";
  }
}
