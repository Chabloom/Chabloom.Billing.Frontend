import { BaseViewModel } from "../modelBase";

export interface SignInViewModel extends BaseViewModel {
  email: string;
  password: string;
  remember: boolean;
  returnUrl: string;
}
