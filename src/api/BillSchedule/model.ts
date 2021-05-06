import { BaseViewModel } from "../../common";

export interface BillScheduleViewModel extends BaseViewModel {
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
