import { BaseApi, BaseApiType } from "../apiBase";
import { PaymentViewModel } from "./model";
import { ApplicationConfig } from "../settings";

export class PaymentsApi
  extends BaseApi<PaymentViewModel>
  implements BaseApiType<PaymentViewModel> {
  baseUrl: string;
  account: string;

  constructor(account: string) {
    super(ApplicationConfig);
    this.baseUrl = `${ApplicationConfig.apiPublicAddress}/api/payments`;
    this.account = account;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<PaymentViewModel> | string> {
    return this._readItems(token, `${this.baseUrl}?accountId=${this.account}`);
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<PaymentViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: PaymentViewModel
  ): Promise<string | undefined> {
    return this._addItem(token, `${this.baseUrl}`, item);
  }

  editItem(
    token: string | undefined,
    item: PaymentViewModel
  ): Promise<string | undefined> {
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: PaymentViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
