import { createParamDecorator } from "@nestjs/common";
import { forest, LOG } from "node-forest";

const MOD = forest("UserDecorator");

export const User = createParamDecorator((data, req) => {
  const user = req.getArgs()[0].user;
  if (user === undefined) {
    LOG(MOD, "ERROR", "@User() is only valid on firebase guarded methods.");
    throw new TypeError("@User() is only valid on firebase guarded methods.");
  }
  return user;
});
