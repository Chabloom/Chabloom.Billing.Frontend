import { BaseViewModel } from "../modelBase";

export interface PaymentScheduleViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currency: string;
  day: number;
  monthInterval: number;
  beginDate: string;
  endDate: string;
  transactionScheduleId: string;
  accountId: string;
}
