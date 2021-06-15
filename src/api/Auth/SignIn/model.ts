import { BaseViewModel } from "../../model";

export interface SignInViewModel extends BaseViewModel {
  username: string;
  password: string;
  persist: boolean;
}
