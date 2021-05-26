import { BaseViewModel } from "../../common";

export interface BillViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currencyId: string;
  dueDate: string;
  transactionId: string;
  accountId: string;
}
