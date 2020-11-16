import { BaseViewModel } from "../../modelBase";

export interface PaymentCardUpdateViewModel extends BaseViewModel {
  id: string;
  name: string;
  cardholderName: string;
  expirationMonth: string;
  expirationYear: string;
}
