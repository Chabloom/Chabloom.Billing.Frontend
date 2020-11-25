import { BaseViewModel } from "../../modelBase";

export interface PaymentViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currency: string;
  dueDate: string;
  complete: boolean;
  account: string;
  readonly paymentSchedule: string;
  transaction: string;
  transactionSchedule: string;
}
