import { BaseAPI } from "../../api";
import { ErrorViewModel } from "./model";

export class ErrorAPI extends BaseAPI<ErrorViewModel> {
  constructor() {
    super(`${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/auth/error`);
  }

  getError(id: string): Promise<boolean> {
    return this._read(`${this._baseUrl}/${id}`);
  }
}
