import { BaseApi } from "../../common";
import { UserAccountViewModel } from "./model";

export class UserAccountsApi extends BaseApi<UserAccountViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/userAccounts`;
  tenantId: string;

  constructor(tenantId: string) {
    super();
    this.tenantId = tenantId;
  }

  readAll(token: string): Promise<[Response | undefined, Array<UserAccountViewModel> | undefined, string]> {
    return this._getAll(`${this.baseUrl}?tenantId=${this.tenantId}`, token);
  }

  create(
    token: string,
    viewModel: UserAccountViewModel
  ): Promise<[Response | undefined, UserAccountViewModel | undefined, string]> {
    viewModel.tenantId = this.tenantId;
    return this._post(`${this.baseUrl}/create`, token, viewModel);
  }

  delete(
    token: string,
    viewModel: UserAccountViewModel
  ): Promise<[Response | undefined, UserAccountViewModel | undefined, string]> {
    return this._post(`${this.baseUrl}/delete`, token, viewModel);
  }
}
