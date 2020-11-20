import { BaseApi, BaseApiType } from "../../apiBase";
import { PaymentCardViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { UserService } from "../../UserService";

export class PaymentCardsApi
  extends BaseApi<PaymentCardViewModel>
  implements BaseApiType<PaymentCardViewModel> {
  baseUrl: string;

  constructor(userService: UserService) {
    super(userService);
    this.baseUrl = `${ApplicationConfig.processingApiPublicAddress}/api/paymentCards`;
  }

  readItems(): Promise<[Array<PaymentCardViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}`);
  }

  readItem(
    itemId: string
  ): Promise<[PaymentCardViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: PaymentCardViewModel
  ): Promise<[PaymentCardViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}/Demo`, item);
  }

  editItem(
    item: PaymentCardViewModel
  ): Promise<[PaymentCardViewModel | undefined, string]> {
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: PaymentCardViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
