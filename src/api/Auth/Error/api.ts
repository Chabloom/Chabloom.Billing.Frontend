import { BaseApi } from "../../../common";
import { ErrorViewModel } from "./model";

export class ErrorApi extends BaseApi<ErrorViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/auth/error`;

  getError(id: string): Promise<[Response | undefined, ErrorViewModel | undefined, string]> {
    return this._get(`${this.baseUrl}/${id}`);
  }
}
