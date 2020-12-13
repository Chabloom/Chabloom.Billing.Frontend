import { User } from "oidc-client";
import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { PaymentViewModel } from "./model";

export class PaymentsApi
  extends BaseApi<PaymentViewModel>
  implements BaseApiType<PaymentViewModel> {
  baseUrl: string;
  accountId: string;

  constructor(user: User | undefined, accountId: string) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/payments`;
    this.accountId = accountId;
  }

  readItems(): Promise<[Array<PaymentViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?accountId=${this.accountId}`);
  }

  readItem(itemId: string): Promise<[PaymentViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: PaymentViewModel
  ): Promise<[PaymentViewModel | undefined, string]> {
    item.accountId = this.accountId;
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: PaymentViewModel
  ): Promise<[PaymentViewModel | undefined, string]> {
    item.accountId = this.accountId;
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: PaymentViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
