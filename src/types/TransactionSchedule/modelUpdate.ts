import { BaseViewModel } from "../modelBase";

export interface TransactionScheduleUpdateViewModel extends BaseViewModel {
  id: string;
  beginDate: string;
  endDate: string;
  paymentCard: string;
}
