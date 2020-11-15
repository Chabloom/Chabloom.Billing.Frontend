import { BaseApi, BaseApiType } from "../apiBase";
import { PaymentScheduleViewModel } from "./model";
import { ApplicationConfig } from "../settings";
import { BaseViewModel } from "../modelBase";

export class PaymentSchedulesApi
  extends BaseApi<PaymentScheduleViewModel>
  implements BaseApiType<PaymentScheduleViewModel> {
  baseUrl: string;
  account: string;

  constructor(account: string) {
    super();
    this.baseUrl = `${ApplicationConfig.apiPublicAddress}/api/paymentSchedules`;
    this.account = account;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<PaymentScheduleViewModel> | string> {
    return this._readItems(token, `${this.baseUrl}?accountId=${this.account}`);
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<PaymentScheduleViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: PaymentScheduleViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    item.account = this.account;
    return this._addItem(token, `${this.baseUrl}`, item);
  }

  editItem(
    token: string | undefined,
    item: PaymentScheduleViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    item.account = this.account;
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: PaymentScheduleViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
