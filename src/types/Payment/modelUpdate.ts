import { BaseViewModel } from "../../modelBase";

export interface PaymentUpdateViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currency: string;
  dueDate: string;
  complete: boolean;
  transaction: string;
  transactionSchedule: string;
}
