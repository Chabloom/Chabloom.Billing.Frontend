import { BaseViewModel } from "../modelBase";

export interface BillViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currency: string;
  dueDate: string;
  transactionId: string;
  accountId: string;
}
