import { BaseApi, BaseApiType } from "../../common";
import { BillViewModel } from "./model";

export class BillsApi extends BaseApi<BillViewModel> implements BaseApiType<BillViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/bills`;
  accountId: string;

  constructor(accountId: string) {
    super();
    this.accountId = accountId;
  }

  readAll(token: string): Promise<[Response | undefined, Array<BillViewModel> | undefined, string]> {
    return this._getAll(`${this.baseUrl}?accountId=${this.accountId}`, token);
  }

  read(token: string, id: string): Promise<[Response | undefined, BillViewModel | undefined, string]> {
    return this._get(`${this.baseUrl}/${id}`, token);
  }

  create(token: string, viewModel: BillViewModel): Promise<[Response | undefined, BillViewModel | undefined, string]> {
    viewModel.accountId = this.accountId;
    viewModel.currencyId = "USD";
    return this._post(`${this.baseUrl}`, token, viewModel);
  }

  edit(token: string, viewModel: BillViewModel): Promise<[Response | undefined, BillViewModel | undefined, string]> {
    viewModel.accountId = this.accountId;
    viewModel.currencyId = "USD";
    return this._put(`${this.baseUrl}/${viewModel.id}`, token, viewModel);
  }

  delete(token: string, viewModel: BillViewModel): Promise<[Response | undefined, string]> {
    return this._delete(`${this.baseUrl}/${viewModel.id}`, token);
  }
}
