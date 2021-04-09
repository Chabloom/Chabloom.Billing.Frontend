import { BaseViewModel } from "../../common";

export interface ApplicationUserViewModel extends BaseViewModel {
  readonly id: string;
  userId: string;
}
