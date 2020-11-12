import { BaseViewModel } from "../modelBase";

export interface PaymentScheduleUpdateViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currency: string;
  day: number;
  monthInterval: number;
  beginDate: string;
  endDate: string;
  account: string;
  transactionSchedule: string;
}
