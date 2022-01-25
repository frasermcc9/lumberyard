import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { Bench, LOG } from "node-forest";
import { FirebaseAuthGuard } from "src/auth/firebase/firebase.guard";
import { User } from "src/util/user.decorator";
import { UserService } from "./user.service";

@Controller("user")
@UseGuards(FirebaseAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Bench()
  @Post()
  async create(@User() user: DecodedIdToken) {
    return this.userService.create(user.uid);
  }

  @Bench()
  @Get()
  async getUser(@User() user: DecodedIdToken) {
    return this.userService.getUser(user.uid);
  }
}
