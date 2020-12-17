import * as React from "react";

import { User, UserManager } from "oidc-client";

import { AccountViewModel, OidcSettings, TenantViewModel } from "./types";

export enum UserLevel {
  Admin,
  Manager,
  Customer,
}

export interface AppContextProps {
  userManager: UserManager;
  getUser: () => Promise<User | null>;
  userLoaded: boolean;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  userLevel: UserLevel;
  selectedUserLevel: UserLevel;
  setSelectedUserLevel: (userLevel: UserLevel) => void;
  authorizedTenants: Array<TenantViewModel>;
  selectedTenant: TenantViewModel | undefined;
  setSelectedTenant: (tenant: TenantViewModel | undefined) => void;
  selectedAccount: AccountViewModel | undefined;
  setSelectedAccount: (account: AccountViewModel | undefined) => void;
  trackedAccounts: Array<AccountViewModel>;
  setTrackedAccounts: (accounts: Array<AccountViewModel>) => void;
}

export const AppContext = React.createContext<AppContextProps>({
  userManager: new UserManager(OidcSettings),
  getUser: async () => null,
  userLoaded: false,
  darkMode: false,
  setDarkMode: () => {},
  userLevel: UserLevel.Customer,
  selectedUserLevel: UserLevel.Customer,
  setSelectedUserLevel: () => {},
  authorizedTenants: [],
  selectedTenant: undefined,
  setSelectedTenant: () => {},
  selectedAccount: undefined,
  setSelectedAccount: () => {},
  trackedAccounts: [],
  setTrackedAccounts: () => {},
});

export const useAppContext = () => React.useContext(AppContext);
