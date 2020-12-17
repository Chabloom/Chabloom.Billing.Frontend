import * as React from "react";

import { UserManager } from "oidc-client";

import { AccountViewModel, OidcSettings, TenantViewModel } from "./types";

export enum UserLevel {
  Admin,
  Manager,
  Customer,
}

export interface AppContextProps {
  userManager: UserManager;
  userLoaded: boolean;
  userId: string;
  userName: string;
  userToken: string;
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
  userLoaded: false,
  userId: "",
  userName: "",
  userToken: "",
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
