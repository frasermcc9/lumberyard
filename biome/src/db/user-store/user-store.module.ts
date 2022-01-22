import { Module } from "@nestjs/common";
import { DbModule } from "../db.module";
import { UserStoreService } from "./user-store.service";

@Module({
  imports: [DbModule],
  providers: [UserStoreService],
  exports: [UserStoreService],
})
export class UserStoreModule {}
