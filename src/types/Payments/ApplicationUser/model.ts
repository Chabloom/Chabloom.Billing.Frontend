import { BaseViewModel } from "../../modelBase";

export interface ApplicationUserViewModel extends BaseViewModel {
  id?: string;
  userId: string;
  role: string;
  roleName?: string;
}
