import { BaseViewModel } from "../BaseViewModel";

export interface InitViewModel extends BaseViewModel {
  name: string;
  amount: number;
  currency: string;
  day: number;
  monthInterval: number;
  beginDate: string;
  endDate: string;
  account: string;
}
