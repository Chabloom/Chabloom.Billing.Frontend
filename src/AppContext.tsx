import * as React from "react";
import { UserManager } from "oidc-client";

import { AccountViewModel, UserAccountViewModel } from "./api";

export interface AppContextProps {
  userManager: UserManager;
  userLoaded: boolean;
  userId: string;
  userName: string;
  userEmail: string;
  userToken: string;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  tenantRoles: string[] | undefined;
  selectedRole: string;
  setSelectedRole: React.Dispatch<React.SetStateAction<string | undefined>>;
  userAccounts: UserAccountViewModel[] | undefined;
  setUserAccounts: React.Dispatch<React.SetStateAction<UserAccountViewModel[] | undefined>>;
  selectedAccount: AccountViewModel | undefined;
  setSelectedAccount: (account: AccountViewModel | undefined) => void;
}

export const AppContext = React.createContext<AppContextProps>({
  userManager: new UserManager({}),
  userLoaded: false,
  userId: "",
  userName: "",
  userEmail: "",
  userToken: "",
  darkMode: false,
  setDarkMode: () => console.warn("setDarkMode not implemented"),
  tenantRoles: undefined,
  selectedRole: "",
  setSelectedRole: () => console.warn("setSelectedRole not implemented"),
  userAccounts: undefined,
  setUserAccounts: () => console.warn("setUserAccounts not implemented"),
  selectedAccount: undefined,
  setSelectedAccount: () => console.warn("setSelectedAccount not implemented"),
});

export const useAppContext = (): AppContextProps => React.useContext(AppContext);
