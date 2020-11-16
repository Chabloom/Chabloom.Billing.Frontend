import { BaseViewModel } from "../modelBase";

export interface SignOutViewModel extends BaseViewModel {
  id: string;
  postLogoutRedirectUri?: string;
}
