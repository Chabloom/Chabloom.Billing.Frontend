import { User } from "oidc-client";
import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { PaymentScheduleViewModel } from "./model";

export class PaymentSchedulesApi
  extends BaseApi<PaymentScheduleViewModel>
  implements BaseApiType<PaymentScheduleViewModel> {
  baseUrl: string;
  accountId: string;

  constructor(user: User | undefined, accountId: string) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/paymentSchedules`;
    this.accountId = accountId;
  }

  readItems(): Promise<[Array<PaymentScheduleViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?accountId=${this.accountId}`);
  }

  readItem(
    itemId: string
  ): Promise<[PaymentScheduleViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: PaymentScheduleViewModel
  ): Promise<[PaymentScheduleViewModel | undefined, string]> {
    item.accountId = this.accountId;
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: PaymentScheduleViewModel
  ): Promise<[PaymentScheduleViewModel | undefined, string]> {
    item.accountId = this.accountId;
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: PaymentScheduleViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
