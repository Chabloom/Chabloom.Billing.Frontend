import { User } from "oidc-client";
import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { BillViewModel } from "./model";

export class BillsApi
  extends BaseApi<BillViewModel>
  implements BaseApiType<BillViewModel> {
  baseUrl: string;
  accountId: string;

  constructor(user: User | undefined, accountId: string) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/bills`;
    this.accountId = accountId;
  }

  readItems(): Promise<[Array<BillViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?accountId=${this.accountId}`);
  }

  readItem(itemId: string): Promise<[BillViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(item: BillViewModel): Promise<[BillViewModel | undefined, string]> {
    item.accountId = this.accountId;
    item.currency = "USD";
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(item: BillViewModel): Promise<[BillViewModel | undefined, string]> {
    item.accountId = this.accountId;
    item.currency = "USD";
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: BillViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
