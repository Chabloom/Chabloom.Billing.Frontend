import { BaseAPI } from "../../api";
import { RegisterViewModel } from "./model";

export class RegisterAPI extends BaseAPI<RegisterViewModel> {
  constructor() {
    super(`${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/auth/register`);
  }

  register(viewModel: RegisterViewModel): Promise<boolean> {
    return this._create(`${this._baseUrl}`, viewModel);
  }
}
