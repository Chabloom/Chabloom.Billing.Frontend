import { BaseViewModel } from "../modelBase";

export interface AccountUserViewModel extends BaseViewModel {
  id?: string;
  userId: string;
  account: string;
  accountName?: string;
  role: string;
  roleName?: string;
}
