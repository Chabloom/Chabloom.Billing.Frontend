import { BaseViewModel } from "../../modelBase";

export interface AccountRoleViewModel extends BaseViewModel {
  id?: string;
  name: string;
  account: string;
}
