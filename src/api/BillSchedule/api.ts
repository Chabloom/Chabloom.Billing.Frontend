import { FullAPI } from "../api";
import { BillScheduleViewModel } from "./model";

export class BillSchedulesAPI extends FullAPI<BillScheduleViewModel> {
  accountId: string;

  constructor(accountId: string) {
    super(`${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/billSchedules`);
    this.accountId = accountId;
  }

  readAll(token: string | undefined = undefined): Promise<boolean> {
    return this._read(`${this._baseUrl}?accountId=${this.accountId}`, token);
  }

  deleteViewModel(viewModel: BillScheduleViewModel, token: string): Promise<boolean> {
    return this._delete(`${this._baseUrl}/${viewModel.id}`, token);
  }

  updateViewModel(viewModel: BillScheduleViewModel, token: string): Promise<boolean> {
    return this._update(`${this._baseUrl}/${viewModel.id}`, viewModel, token);
  }
}
