import { ApplicationConfig, BaseApi, BaseApiType } from "../apiBase";
import { PaymentScheduleViewModel } from "./model";

export class PaymentSchedulesApi
  extends BaseApi<PaymentScheduleViewModel>
  implements BaseApiType<PaymentScheduleViewModel> {
  baseUrl: string;
  user: string | null;

  constructor(config: ApplicationConfig, user: string | null = null) {
    super(config);
    this.baseUrl = `${config.apiPublicAddress}/api/paymentSchedules`;
    this.user = user;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<PaymentScheduleViewModel> | string> {
    if (this.user) {
      return this._readItems(token, `${this.baseUrl}?userId=${this.user}`);
    } else {
      return this._readItems(token, `${this.baseUrl}`);
    }
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
  ): Promise<string | undefined> {
    return this._addItem(token, `${this.baseUrl}`, item);
  }

  editItem(
    token: string | undefined,
    item: PaymentScheduleViewModel
  ): Promise<string | undefined> {
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: PaymentScheduleViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
