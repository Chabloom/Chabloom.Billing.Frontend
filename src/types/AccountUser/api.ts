import { User } from "oidc-client";
import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { AccountUserViewModel } from "./model";

export class AccountUsersApi
  extends BaseApi<AccountUserViewModel>
  implements BaseApiType<AccountUserViewModel> {
  baseUrl: string;
  accountId: string;

  constructor(user: User | undefined, accountId: string) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/accountUsers`;
    this.accountId = accountId;
  }

  readItems(): Promise<[Array<AccountUserViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?accountId=${this.accountId}`);
  }

  readItem(
    itemId: string
  ): Promise<[AccountUserViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: AccountUserViewModel
  ): Promise<[AccountUserViewModel | undefined, string]> {
    item.accountId = this.accountId;
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: AccountUserViewModel
  ): Promise<[AccountUserViewModel | undefined, string]> {
    item.accountId = this.accountId;
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: AccountUserViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
