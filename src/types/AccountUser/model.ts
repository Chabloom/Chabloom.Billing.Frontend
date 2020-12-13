import { BaseViewModel } from "../modelBase";

export interface AccountUserViewModel extends BaseViewModel {
  readonly id: string;
  userId: string;
  accountId: string;
}
