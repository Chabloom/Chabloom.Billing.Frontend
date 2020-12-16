import { BaseViewModel } from "../modelBase";

export interface TransactionScheduleViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currency: string;
  day: number;
  monthInterval: number;
  paymentCardId: string;
}
