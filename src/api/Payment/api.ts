import { BaseApi, BaseApiType } from "../../common";
import { PaymentViewModel } from "./model";

export class PaymentsApi extends BaseApi<PaymentViewModel> implements BaseApiType<PaymentViewModel> {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `${process.env.REACT_APP_TRANSACTIONS_BACKEND_ADDRESS}/api/payments`;
  }

  readItems(token: string): Promise<[Array<PaymentViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}`, token);
  }

  readItem(token: string, itemId: string): Promise<[PaymentViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`, token);
  }

  addItem(token: string, item: PaymentViewModel): Promise<[PaymentViewModel | undefined, string]> {
    item.currency = "USD";
    return this._addItem(`${this.baseUrl}`, token, item);
  }

  editItem(token: string, item: PaymentViewModel): Promise<[PaymentViewModel | undefined, string]> {
    item.currency = "USD";
    return this._editItem(`${this.baseUrl}/${item.id}`, token, item);
  }

  deleteItem(token: string, item: PaymentViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`, token);
  }
}
