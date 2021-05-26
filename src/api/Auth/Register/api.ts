import { BaseApi } from "../../../common";
import { RegisterViewModel } from "./model";

export class RegisterApi extends BaseApi<RegisterViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/account/register`;

  register(viewModel: RegisterViewModel): Promise<[Response | undefined, RegisterViewModel | undefined, string]> {
    return this._post(`${this.baseUrl}`, undefined, viewModel);
  }
}
