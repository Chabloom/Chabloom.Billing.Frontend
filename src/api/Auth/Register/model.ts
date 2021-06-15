import { BaseViewModel } from "../../model";

export interface RegisterViewModel extends BaseViewModel {
  username: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
}
