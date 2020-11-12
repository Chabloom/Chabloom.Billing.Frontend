import { ApplicationConfigType, BaseApi, BaseApiType } from "../apiBase";
import { PaymentViewModel } from "./model";

export class PaymentsApi
  extends BaseApi<PaymentViewModel>
  implements BaseApiType<PaymentViewModel> {
  baseUrl: string;
  user: string | null;

  constructor(config: ApplicationConfigType, user: string | null = null) {
    super(config);
    this.baseUrl = `${config.apiPublicAddress}/api/payments`;
    this.user = user;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<PaymentViewModel> | string> {
    if (this.user) {
      return this._readItems(token, `${this.baseUrl}?userId=${this.user}`);
    } else {
      return this._readItems(token, `${this.baseUrl}`);
    }
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
