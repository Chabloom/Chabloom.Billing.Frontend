import { BaseViewModel } from "../modelBase";

export interface PaymentViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currency: string;
  dueDate: string;
  transactionId: string;
  accountId: string;
}
