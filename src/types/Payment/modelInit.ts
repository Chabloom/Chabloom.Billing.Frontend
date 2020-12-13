import { BaseViewModel } from "../../modelBase";

export interface PaymentInitViewModel extends BaseViewModel {
  name: string;
  amount: number;
  currency: string;
  dueDate: string;
  account: string;
}
