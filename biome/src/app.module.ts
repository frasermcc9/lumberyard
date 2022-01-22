import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { LogModule } from "./controllers/log/log.module";
import { DbModule } from "./db/db.module";
import { FirebaseAuthStrategy } from "./auth/firebase/firebase.auth";
import { UserStoreModule } from "./db/user-store/user-store.module";
import { ApiKeyStrategy } from "./auth/token/token.auth";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "./controllers/user/user.module";

@Module({
  imports: [LogModule, DbModule, UserStoreModule, PassportModule, UserModule],
  controllers: [AppController],
  providers: [FirebaseAuthStrategy, ApiKeyStrategy],
})
export class AppModule {}
