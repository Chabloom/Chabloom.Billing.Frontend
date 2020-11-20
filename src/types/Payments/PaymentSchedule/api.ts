import { BaseApi, BaseApiType } from "../../apiBase";
import { PaymentScheduleViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { UserService } from "../../UserService";

export class PaymentSchedulesApi
  extends BaseApi<PaymentScheduleViewModel>
  implements BaseApiType<PaymentScheduleViewModel> {
  baseUrl: string;
  account: string;

  constructor(userService: UserService, account: string) {
    super(userService);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/paymentSchedules`;
    this.account = account;
  }

  readItems(): Promise<[Array<PaymentScheduleViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?accountId=${this.account}`);
  }

  readItem(
    itemId: string
  ): Promise<[PaymentScheduleViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: PaymentScheduleViewModel
  ): Promise<[PaymentScheduleViewModel | undefined, string]> {
    item.account = this.account;
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: PaymentScheduleViewModel
  ): Promise<[PaymentScheduleViewModel | undefined, string]> {
    item.account = this.account;
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: PaymentScheduleViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
