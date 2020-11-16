import { BaseViewModel } from "../../modelBase";

export interface PaymentCardInitViewModel extends BaseViewModel {
  name: string;
  cardNumber: string;
  cardholderName: string;
  expirationMonth: string;
  expirationYear: string;
}
