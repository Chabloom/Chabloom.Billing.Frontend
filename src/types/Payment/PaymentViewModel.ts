import { BaseViewModel } from "../BaseViewModel";

export interface PaymentViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currency: string;
  dueDate: string;
  complete: string;
  account: string;
  readonly paymentSchedule: string;
  transaction: string;
  transactionSchedule: string;
}
