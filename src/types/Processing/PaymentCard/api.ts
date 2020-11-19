import { BaseApi, BaseApiType } from "../../apiBase";
import { PaymentCardViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { BaseViewModel } from "../../modelBase";

export class PaymentCardsApi
  extends BaseApi<PaymentCardViewModel>
  implements BaseApiType<PaymentCardViewModel> {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `${ApplicationConfig.processingApiPublicAddress}/api/paymentCards`;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<PaymentCardViewModel> | string> {
    return this._readItems(token, `${this.baseUrl}`);
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<PaymentCardViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: PaymentCardViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    return this._addItem(token, `${this.baseUrl}/Demo`, item);
  }

  editItem(
    token: string | undefined,
    item: PaymentCardViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: PaymentCardViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
