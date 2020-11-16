import { BaseViewModel } from "../../modelBase";

export interface TransactionViewModel extends BaseViewModel {
  id: string;
  name: string;
  amount: number;
  currency: string;
  complete: boolean;
  paymentCard: string;
  externalTransactionId: string;
}
