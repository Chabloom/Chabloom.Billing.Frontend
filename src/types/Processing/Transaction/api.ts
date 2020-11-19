import { BaseApi, BaseApiType } from "../../apiBase";
import { TransactionViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { BaseViewModel } from "../../modelBase";

export class TransactionsApi
  extends BaseApi<TransactionViewModel>
  implements BaseApiType<TransactionViewModel> {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `${ApplicationConfig.processingApiPublicAddress}/api/transactions`;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<TransactionViewModel> | string> {
    return this._readItems(token, `${this.baseUrl}`);
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<TransactionViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: TransactionViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    return this._addItem(token, `${this.baseUrl}/Demo`, item);
  }

  editItem(
    token: string | undefined,
    item: TransactionViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: TransactionViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
