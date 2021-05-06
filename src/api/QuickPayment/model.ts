import { BaseViewModel } from "../../common";

export interface QuickPaymentViewModel extends BaseViewModel {
  billId: string;
  transactionId: string;
}
