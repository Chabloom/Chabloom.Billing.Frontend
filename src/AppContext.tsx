import * as React from "react";
import { UserManager } from "oidc-client";

import { AppContextCheckoutProps } from "./checkout";
import { AccountViewModel, TenantViewModel, UserAccountViewModel } from "./api";

export enum UserLevel {
  Admin,
  Manager,
  Customer,
}

export interface AppContextProps extends AppContextCheckoutProps {
  tenant: TenantViewModel | undefined;
  userAccounts: UserAccountViewModel[] | undefined;
  setUserAccounts: React.Dispatch<React.SetStateAction<UserAccountViewModel[] | undefined>>;
  userLevel: UserLevel;
  selectedUserLevel: UserLevel;
  setSelectedUserLevel: (userLevel: UserLevel) => void;
  selectedAccount: AccountViewModel | undefined;
  setSelectedAccount: (account: AccountViewModel | undefined) => void;
}

export const AppContext = React.createContext<AppContextProps>({
  userManager: new UserManager({}),
  userLoaded: false,
  userId: "",
  userName: "",
  userToken: "",
  darkMode: false,
  setDarkMode: () => console.warn("setDarkMode not implemented"),
  productCounts: new Map<string, number>(),
  setProductCounts: () => console.warn("setProductCounts not implemented"),
  pickupMethod: "Shipping",
  setPickupMethod: () => console.warn("setPickupMethod not implemented"),
  tenant: undefined,
  userAccounts: undefined,
  setUserAccounts: () => console.warn("setUserAccounts not implemented"),
  userLevel: UserLevel.Customer,
  selectedUserLevel: UserLevel.Customer,
  setSelectedUserLevel: () => console.warn("setSelectedUserLevel not implemented"),
  selectedAccount: undefined,
  setSelectedAccount: () => console.warn("setSelectedAccount not implemented"),
});

export const useAppContext = (): AppContextProps => React.useContext(AppContext);
