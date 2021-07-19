import { BaseViewModel } from "../model";

export interface BillScheduleViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currencyId: string;
  day: number;
  monthInterval: number;
  beginDate: string;
  endDate: string;
  transactionScheduleId: string;
  accountId: string;
}
