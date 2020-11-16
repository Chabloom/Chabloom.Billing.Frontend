import { BaseViewModel } from "../../modelBase";

export interface TransactionUpdateViewModel extends BaseViewModel {
  id: string;
  paymentCard: string;
}
