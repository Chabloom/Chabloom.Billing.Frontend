import { BaseViewModel } from "./BaseViewModel";

export interface AccountUserViewModel extends BaseViewModel {
  id?: string;
  userId: string;
  account: string;
  accountName?: string;
  role: string;
  roleName?: string;
}
