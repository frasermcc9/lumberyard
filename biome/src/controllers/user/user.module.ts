import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserStoreModule } from "src/db/user-store/user-store.module";

@Module({
  imports: [UserStoreModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
