export interface PaymentViewModel {
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
