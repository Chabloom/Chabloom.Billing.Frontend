import { FullAPI } from "../api";
import { BillViewModel } from "./model";

export class BillsAPI extends FullAPI<BillViewModel> {
  accountId: string;

  constructor(accountId: string) {
    super(`${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/bills`);
    this.accountId = accountId;
  }

  readAll(token: string | undefined = undefined): Promise<boolean> {
    return this._read(`${this._baseUrl}?accountId=${this.accountId}`, token);
  }

  deleteViewModel(viewModel: BillViewModel, token: string): Promise<boolean> {
    return this._delete(`${this._baseUrl}/${viewModel.id}`, token);
  }

  updateViewModel(viewModel: BillViewModel, token: string): Promise<boolean> {
    return this._update(`${this._baseUrl}/${viewModel.id}`, viewModel, token);
  }
}
