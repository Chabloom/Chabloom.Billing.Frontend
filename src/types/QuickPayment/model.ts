import { BaseViewModel } from "../modelBase";

export interface QuickPaymentViewModel extends BaseViewModel {
  billId: string;
  transactionId: string;
}
