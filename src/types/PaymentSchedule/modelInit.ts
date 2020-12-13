import { BaseViewModel } from "../../modelBase";

export interface PaymentScheduleInitViewModel extends BaseViewModel {
  name: string;
  amount: number;
  currency: string;
  day: number;
  monthInterval: number;
  beginDate: string;
  endDate: string;
  account: string;
}
