import { BaseAPI } from "../../api";
import { SignInViewModel } from "./model";

export class SignInAPI extends BaseAPI<SignInViewModel> {
  constructor() {
    super(`${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/auth`);
  }

  signIn(viewModel: SignInViewModel): Promise<boolean> {
    return this._create(`${this._baseUrl}/signIn`, viewModel);
  }

  signOut(id: string): Promise<boolean> {
    return this._create(`${this._baseUrl}/signOut/${id}`);
  }
}
