import { BaseViewModel } from "../BaseViewModel";

export interface InitViewModel extends BaseViewModel {
  name: string;
  amount: number;
  currency: string;
  dueDate: string;
  account: string;
}
