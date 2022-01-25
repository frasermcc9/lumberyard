import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-firebase-jwt";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { UserStoreService } from "src/db/user-store/user-store.service";
import { forest, LOG } from "node-forest";

const MOD = forest("FirebaseAuthStrategy");

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  "firebase-auth",
) {
  constructor(private readonly userStore: UserStoreService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    initializeApp({ credential: cert(require("../../../keys/firebase.json")) });
  }

  async validate(token: string) {
    LOG(MOD, "INFO", `Validating token.`);
    const firebaseUser = await getAuth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        LOG(MOD, "WARN", `Error: ${err.message} when validating token.`);
        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      LOG(MOD, "WARN", `Unable to get user. Not authorizing.`);
      throw new UnauthorizedException();
    }

    LOG(
      MOD,
      "INFO",
      `User ${firebaseUser.uid} is authorized. Creating their database entry if it does not exist.`,
    );
    await this.userStore.findOrCreate({ id: firebaseUser.uid });

    return firebaseUser;
  }
}
