import { User } from "oidc-client";
import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { AccountViewModel } from "./model";

export class AccountsApi
  extends BaseApi<AccountViewModel>
  implements BaseApiType<AccountViewModel> {
  baseUrl: string;
  tenantId: string;

  constructor(user: User | undefined = undefined, tenantId: string = "") {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/accounts`;
    this.tenantId = tenantId;
  }

  readItems(): Promise<[Array<AccountViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?tenantId=${this.tenantId}`);
  }

  readItemsAuthorized(): Promise<
    [Array<AccountViewModel> | undefined, string]
  > {
    return this._readItems(`${this.baseUrl}/Authorized`);
  }

  readItem(itemId: string): Promise<[AccountViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  readItemReference(
    itemId: string
  ): Promise<[AccountViewModel | undefined, string]> {
    return this._readItem(
      `${this.baseUrl}/Reference/${itemId}?tenantId=${this.tenantId}`
    );
  }

  addItem(
    item: AccountViewModel
  ): Promise<[AccountViewModel | undefined, string]> {
    item.tenantId = this.tenantId;
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: AccountViewModel
  ): Promise<[AccountViewModel | undefined, string]> {
    item.tenantId = this.tenantId;
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: AccountViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
