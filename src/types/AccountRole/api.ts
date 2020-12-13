import { BaseApi, BaseApiType } from "../apiBase";
import { AccountRoleViewModel } from "./model";
import { ApplicationConfig } from "../settings";
import { User } from "oidc-client";

export class AccountRolesApi
  extends BaseApi<AccountRoleViewModel>
  implements BaseApiType<AccountRoleViewModel> {
  baseUrl: string;
  account: string | null;
  tenant: string | null;

  constructor(
    user: User | undefined,
    account: string | null = null,
    tenant: string | null = null
  ) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/accountRoles`;
    this.account = account;
    this.tenant = tenant;
  }

  readItems(): Promise<[Array<AccountRoleViewModel> | undefined, string]> {
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
  ): Promise<[AccountRoleViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: AccountRoleViewModel
  ): Promise<[AccountRoleViewModel | undefined, string]> {
    if (this.account) {
      item.account = this.account;
    }
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: AccountRoleViewModel
  ): Promise<[AccountRoleViewModel | undefined, string]> {
    if (this.account) {
      item.account = this.account;
    }
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: AccountRoleViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
