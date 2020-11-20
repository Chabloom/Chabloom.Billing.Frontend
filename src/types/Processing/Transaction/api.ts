import { BaseApi, BaseApiType } from "../../apiBase";
import { TransactionViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { UserService } from "../../UserService";

export class TransactionsApi
  extends BaseApi<TransactionViewModel>
  implements BaseApiType<TransactionViewModel> {
  baseUrl: string;

  constructor(userService: UserService) {
    super(userService);
    this.baseUrl = `${ApplicationConfig.processingApiPublicAddress}/api/transactions`;
  }

  readItems(): Promise<[Array<TransactionViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}`);
  }

  readItem(
    itemId: string
  ): Promise<[TransactionViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: TransactionViewModel
  ): Promise<[TransactionViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}/Demo`, item);
  }

  editItem(
    item: TransactionViewModel
  ): Promise<[TransactionViewModel | undefined, string]> {
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: TransactionViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
