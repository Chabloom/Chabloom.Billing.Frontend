import { BaseAPI } from "../../api";
import { ErrorViewModel } from "./model";

export class ErrorAPI extends BaseAPI<ErrorViewModel> {
  constructor() {
    super(`${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/auth`);
  }

  getError(id: string): Promise<boolean> {
    return this._read(`${this._baseUrl}/error/${id}`);
  }
}
