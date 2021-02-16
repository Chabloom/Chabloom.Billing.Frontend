import { BaseApi, BaseApiType } from "../apiBase";
import { TransactionViewModel } from "./model";
import { ApplicationConfig } from "../settings";

export class TransactionsApi extends BaseApi<TransactionViewModel> implements BaseApiType<TransactionViewModel> {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `${ApplicationConfig.backendPublicAddress}/api/transactions`;
  }

  readItems(token: string): Promise<[Array<TransactionViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}`, token);
  }

  readItem(token: string, itemId: string): Promise<[TransactionViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`, token);
  }

  addItem(token: string, item: TransactionViewModel): Promise<[TransactionViewModel | undefined, string]> {
    item.currency = "USD";
    return this._addItem(`${this.baseUrl}`, token, item);
  }

  editItem(token: string, item: TransactionViewModel): Promise<[TransactionViewModel | undefined, string]> {
    item.currency = "USD";
    return this._editItem(`${this.baseUrl}/${item.id}`, token, item);
  }

  deleteItem(token: string, item: TransactionViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`, token);
  }
}
