import { BaseViewModel } from "../modelBase";

export interface RegisterViewModel extends BaseViewModel {
  name: string;
  email: string;
  phone: string;
  password: string;
}
