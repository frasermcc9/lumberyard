import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { LogModule } from "./controllers/log/log.module";
import { DbModule } from "./db/db.module";
import { FirebaseAuthStrategy } from "./auth/firebase/firebase.auth";
import { UserStoreModule } from "./db/user-store/user-store.module";
import { ApiKeyStrategy } from "./auth/token/token.auth";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "./controllers/user/user.module";
import { ProjectModule } from "./controllers/project/project.module";
import { ProjectStoreModule } from "./db/project-store/project-store.module";

@Module({
  imports: [
    LogModule,
    DbModule,
    UserStoreModule,
    PassportModule,
    UserModule,
    ProjectModule,
    ProjectStoreModule,
  ],
  controllers: [AppController],
  providers: [FirebaseAuthStrategy, ApiKeyStrategy],
})
export class AppModule {}
