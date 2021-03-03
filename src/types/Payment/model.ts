import { BaseViewModel } from "../modelBase";

export interface PaymentViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  amount: number;
  currency: string;
  paymentAccountId: string;
  paymentCardId: string;
  readonly complete: boolean;
}
