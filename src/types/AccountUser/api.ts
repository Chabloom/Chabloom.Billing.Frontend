import { BaseApi, BaseApiType } from "../apiBase";
import { AccountUserViewModel } from "./model";
import { ApplicationConfig } from "../settings";
import { User } from "oidc-client";

export class AccountUsersApi
  extends BaseApi<AccountUserViewModel>
  implements BaseApiType<AccountUserViewModel> {
  baseUrl: string;
  account: string | null;
  tenant: string | null;

  constructor(
    user: User | undefined,
    account: string | null = null,
    tenant: string | null = null
  ) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/accountUsers`;
    this.account = account;
    this.tenant = tenant;
  }

  readItems(): Promise<[Array<AccountUserViewModel> | undefined, string]> {
    if (this.account) {
      return this._readItems(`${this.baseUrl}?accountId=${this.account}`);
    } else if (this.tenant) {
      return this._readItems(`${this.baseUrl}?tenantId=${this.tenant}`);
    } else {
      return this._readItems(`${this.baseUrl}`);
    }
  }

  readItem(
    itemId: string
  ): Promise<[AccountUserViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: AccountUserViewModel
  ): Promise<[AccountUserViewModel | undefined, string]> {
    if (this.account) {
      item.account = this.account;
    }
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: AccountUserViewModel
  ): Promise<[AccountUserViewModel | undefined, string]> {
    if (this.account) {
      item.account = this.account;
    }
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: AccountUserViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
