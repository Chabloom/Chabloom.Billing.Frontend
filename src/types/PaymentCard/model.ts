import { BaseViewModel } from "../modelBase";

export interface PaymentCardViewModel extends BaseViewModel {
  id: string;
  name: string;
  cardNumberLast4: string;
  cardholderName: string;
  expirationMonth: string;
  expirationYear: string;
}
