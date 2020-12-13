import { BaseViewModel } from "../modelBase";

export interface ApplicationUserViewModel extends BaseViewModel {
  readonly id: string;
  userId: string;
}
