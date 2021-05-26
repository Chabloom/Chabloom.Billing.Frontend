import { BaseViewModel } from "../../../common";

export interface SignInViewModel extends BaseViewModel {
  username: string;
  password: string;
  persist: boolean;
  tenantId: string;
}
