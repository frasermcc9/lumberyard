import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { ProjectStoreService } from "src/db/project-store/project-store.service";
import { UserStoreService } from "src/db/user-store/user-store.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  "api-key",
) {
  constructor(private readonly projectStore: ProjectStoreService) {
    super({ header: "X-API-Key", prefix: "" }, true, async (apiKey, done) => {
      return await this.validate(apiKey, done);
    });
  }

  public async validate(apiKey: string, done: (error, data) => {}) {
    const user = await this.projectStore.getProjectByApiKey({ apiKey });
    if (user) {
      return done(null, true);
    }

    return done(
      new UnauthorizedException("The API key provided is not valid."),
      false,
    );
  }
}
