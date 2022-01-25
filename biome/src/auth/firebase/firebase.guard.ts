import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { forest, LOG } from "node-forest";

const MOD = forest("FirebaseAuthGuard");

@Injectable()
export class FirebaseAuthGuard extends AuthGuard("firebase-auth") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>("public", [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    LOG(MOD, "INFO", `Checking firebase auth strategy.`);

    return super.canActivate(context);
  }
}
