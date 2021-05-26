import { BaseViewModel } from "../../../common";

export interface RegisterViewModel extends BaseViewModel {
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  tenantId: string;
}
