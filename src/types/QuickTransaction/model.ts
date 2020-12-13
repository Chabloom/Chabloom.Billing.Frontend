import { BaseViewModel } from "../modelBase";

export interface QuickTransactionViewModel extends BaseViewModel {
  paymentId: string;
  transactionId: string;
}
