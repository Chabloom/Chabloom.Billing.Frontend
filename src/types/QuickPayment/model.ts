import { BaseViewModel } from "../modelBase";

export interface QuickPaymentViewModel extends BaseViewModel {
  paymentId: string;
  transactionId: string;
}
