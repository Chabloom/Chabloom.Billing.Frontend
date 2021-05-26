import { BaseApi } from "../../../common";
import { SignInViewModel } from "./model";

export class SignInApi extends BaseApi<SignInViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/account/signIn`;

  signIn(viewModel: SignInViewModel): Promise<[Response | undefined, SignInViewModel | undefined, string]> {
    return this._post(`${this.baseUrl}`, undefined, viewModel);
  }

  signOut(id: string): Promise<[Response | undefined, SignInViewModel | undefined, string]> {
    return this._post(`${this.baseUrl}/${id}`);
  }
}
