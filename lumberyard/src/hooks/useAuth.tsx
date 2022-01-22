import { createStatefulContext } from "@frasermcc/stateful-context";
import { User } from "firebase/auth";

interface AuthState {
  authLoaded: boolean;
  user?: User | null;
}

const [useAuth, AuthContextProvider] = createStatefulContext<AuthState>({
  authLoaded: false,
});

export { useAuth, AuthContextProvider };
