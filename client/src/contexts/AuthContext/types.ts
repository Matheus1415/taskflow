import type { UserAccount } from "@/types/UserAccount";

export interface AuthContextState {
  isAuthenticated: boolean;
  user: UserAccount | undefined;
  isLoading: boolean;
}

export type Actions =
  | {
      type: "LOGIN";
      payload: {
        user: UserAccount;
      };
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "REFRESH_USER";
      payload: {
        user: UserAccount;
      };
    };
