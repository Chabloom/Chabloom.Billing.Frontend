import { BaseViewModel } from "../../common";

export interface AccountUserViewModel extends BaseViewModel {
  readonly id: string;
  userId: string;
  accountId: string;
}
