import { BaseViewModel } from "../../modelBase";

export interface TransactionScheduleViewModel extends BaseViewModel {
  id: string;
  name: string;
  amount: number;
  currency: string;
  day: number;
  monthInterval: number;
  beginDate: string;
  endDate: string;
  paymentCard: string;
}
