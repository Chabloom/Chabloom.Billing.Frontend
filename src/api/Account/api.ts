import { BaseApi, BaseApiType } from "../../common";
import { AccountViewModel } from "./model";

export class AccountsApi extends BaseApi<AccountViewModel> implements BaseApiType<AccountViewModel> {
  baseUrl = "";
  tenantId: string;

  constructor(tenantId = "") {
    super();
    const envConfig = 'env-config';
    import(envConfig)
        .then(x => this.baseUrl = `${x.config.REACT_APP_BILLING_BACKEND_ADDRESS}/api/accounts`);
    this.tenantId = tenantId;
  }

  readItems(token: string): Promise<[Array<AccountViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?tenantId=${this.tenantId}`, token);
  }

  readItemsAuthorized(token: string): Promise<[Array<AccountViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}/Authorized`, token);
  }

  readItem(token: string, itemId: string): Promise<[AccountViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`, token);
  }

  readItemReference(token: string, itemId: string): Promise<[AccountViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/Reference/${itemId}?tenantId=${this.tenantId}`, token);
  }

  addItem(token: string, item: AccountViewModel): Promise<[AccountViewModel | undefined, string]> {
    item.tenantId = this.tenantId;
    return this._addItem(`${this.baseUrl}`, token, item);
  }

  editItem(token: string, item: AccountViewModel): Promise<[AccountViewModel | undefined, string]> {
    item.tenantId = this.tenantId;
    return this._editItem(`${this.baseUrl}/${item.id}`, token, item);
  }

  deleteItem(token: string, item: AccountViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`, token);
  }
}
