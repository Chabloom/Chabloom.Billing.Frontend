import { BaseApi, BaseApiType } from "../../common";
import { BillScheduleViewModel } from "./model";

export class BillSchedulesApi extends BaseApi<BillScheduleViewModel> implements BaseApiType<BillScheduleViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/billSchedules`;
  accountId: string;

  constructor(accountId: string) {
    super();
    this.accountId = accountId;
  }

  readAll(token: string): Promise<[Response | undefined, Array<BillScheduleViewModel> | undefined, string]> {
    return this._getAll(`${this.baseUrl}?accountId=${this.accountId}`, token);
  }

  read(token: string, id: string): Promise<[Response | undefined, BillScheduleViewModel | undefined, string]> {
    return this._get(`${this.baseUrl}/${id}`, token);
  }

  create(
    token: string,
    viewModel: BillScheduleViewModel
  ): Promise<[Response | undefined, BillScheduleViewModel | undefined, string]> {
    viewModel.accountId = this.accountId;
    viewModel.currencyId = "USD";
    return this._post(`${this.baseUrl}`, token, viewModel);
  }

  edit(
    token: string,
    viewModel: BillScheduleViewModel
  ): Promise<[Response | undefined, BillScheduleViewModel | undefined, string]> {
    viewModel.accountId = this.accountId;
    viewModel.currencyId = "USD";
    return this._put(`${this.baseUrl}/${viewModel.id}`, token, viewModel);
  }

  delete(token: string, id: string): Promise<[Response | undefined, string]> {
    return this._delete(`${this.baseUrl}/${id}`, token);
  }
}
