import { BaseApi, BaseApiType } from "../../common";
import { AccountUserViewModel } from "./model";

export class AccountUsersApi extends BaseApi<AccountUserViewModel> implements BaseApiType<AccountUserViewModel> {
  baseUrl = "";
  accountId: string;

  constructor(accountId: string) {
    super();
    this.baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/accountUsers`;
    this.accountId = accountId;
  }

  readItems(token: string): Promise<[Array<AccountUserViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?accountId=${this.accountId}`, token);
  }

  readItem(token: string, itemId: string): Promise<[AccountUserViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`, token);
  }

  addItem(token: string, item: AccountUserViewModel): Promise<[AccountUserViewModel | undefined, string]> {
    item.accountId = this.accountId;
    return this._addItem(`${this.baseUrl}`, token, item);
  }

  editItem(token: string, item: AccountUserViewModel): Promise<[AccountUserViewModel | undefined, string]> {
    item.accountId = this.accountId;
    return this._editItem(`${this.baseUrl}/${item.id}`, token, item);
  }

  deleteItem(token: string, item: AccountUserViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`, token);
  }
}
