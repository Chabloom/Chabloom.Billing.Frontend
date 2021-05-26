import { BaseApi, BaseApiType } from "../../common";
import { AccountViewModel } from "./model";

export class AccountsApi extends BaseApi<AccountViewModel> implements BaseApiType<AccountViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/accounts`;
  tenantId: string;

  constructor(tenantId: string) {
    super();
    this.tenantId = tenantId;
  }

  readAll(token: string): Promise<[Response | undefined, Array<AccountViewModel> | undefined, string]> {
    return this._getAll(`${this.baseUrl}?tenantId=${this.tenantId}`, token);
  }

  read(token: string, id: string): Promise<[Response | undefined, AccountViewModel | undefined, string]> {
    return this._get(`${this.baseUrl}/${id}`, token);
  }

  create(
    token: string,
    viewModel: AccountViewModel
  ): Promise<[Response | undefined, AccountViewModel | undefined, string]> {
    viewModel.tenantId = this.tenantId;
    return this._post(`${this.baseUrl}`, token, viewModel);
  }

  edit(
    token: string,
    viewModel: AccountViewModel
  ): Promise<[Response | undefined, AccountViewModel | undefined, string]> {
    viewModel.tenantId = this.tenantId;
    return this._put(`${this.baseUrl}/${viewModel.id}`, token, viewModel);
  }

  delete(token: string, id: string): Promise<[Response | undefined, string]> {
    return this._delete(`${this.baseUrl}/${id}`, token);
  }
}
