import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { BillViewModel } from "./model";

export class BillsApi extends BaseApi<BillViewModel> implements BaseApiType<BillViewModel> {
  baseUrl: string;
  accountId: string;

  constructor(accountId: string) {
    super();
    this.baseUrl = `${ApplicationConfig.backendPublicAddress}/api/bills`;
    this.accountId = accountId;
  }

  readItems(token: string): Promise<[Array<BillViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?accountId=${this.accountId}`, token);
  }

  readItem(token: string, itemId: string): Promise<[BillViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`, token);
  }

  addItem(token: string, item: BillViewModel): Promise<[BillViewModel | undefined, string]> {
    item.accountId = this.accountId;
    item.currency = "USD";
    return this._addItem(`${this.baseUrl}`, token, item);
  }

  editItem(token: string, item: BillViewModel): Promise<[BillViewModel | undefined, string]> {
    item.accountId = this.accountId;
    item.currency = "USD";
    return this._editItem(`${this.baseUrl}/${item.id}`, token, item);
  }

  deleteItem(token: string, item: BillViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`, token);
  }
}
