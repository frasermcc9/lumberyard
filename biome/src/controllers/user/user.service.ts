import { Injectable } from "@nestjs/common";
import { UserStoreService } from "src/db/user-store/user-store.service";

@Injectable()
export class UserService {
  constructor(private readonly userStore: UserStoreService) {}

  create(uId: string) {
    this.userStore.createUser(uId);
  }

  getUser(uId: string) {
    return this.userStore.findOrCreate({ id: uId });
  }
}
