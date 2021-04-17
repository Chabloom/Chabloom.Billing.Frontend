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
  productCounts: Map<string, number>;
  setProductCounts: React.Dispatch<React.SetStateAction<Map<string, number>>>;
  pickupMethod: string;
  setPickupMethod: (pickupMethod: string) => void;
}

export const AppContext = React.createContext<AppContextProps>({
  userManager: new UserManager(OidcSettings),
  userLoaded: false,
  userId: "",
  userName: "",
  userToken: "",
  darkMode: false,
  setDarkMode: () => console.warn("setDarkMode not implemented"),
  userLevel: UserLevel.Customer,
  selectedUserLevel: UserLevel.Customer,
  setSelectedUserLevel: () => console.warn("setSelectedUserLevel not implemented"),
  authorizedTenants: [],
  selectedTenant: undefined,
  setSelectedTenant: () => console.warn("setSelectedTenant not implemented"),
  selectedAccount: undefined,
  setSelectedAccount: () => console.warn("setSelectedAccount not implemented"),
  trackedAccounts: [],
  setTrackedAccounts: () => console.warn("setTrackedAccounts not implemented"),
  productCounts: new Map<string, number>(),
  setProductCounts: () => console.warn("setProductCounts not implemented"),
  pickupMethod: "Shipping",
  setPickupMethod: () => console.warn("setPickupMethod not implemented"),
});

export const useAppContext = (): AppContextProps => React.useContext(AppContext);
