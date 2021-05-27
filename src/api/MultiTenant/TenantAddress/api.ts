import { BaseApi } from "../../../common";
import { TenantAddressViewModel } from "./model";

export class TenantAddressesApi extends BaseApi<TenantAddressViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/tenantAddresses`;
  tenantId: string;

  constructor(tenantId: string) {
    super();
    this.tenantId = tenantId;
  }

  readAll(token: string): Promise<[Response | undefined, Array<TenantAddressViewModel> | undefined, string]> {
    return this._getAll(`${this.baseUrl}?tenantId=${this.tenantId}`, token);
  }

  create(
    token: string,
    viewModel: TenantAddressViewModel
  ): Promise<[Response | undefined, TenantAddressViewModel | undefined, string]> {
    viewModel.tenantId = this.tenantId;
    return this._post(`${this.baseUrl}/create`, token, viewModel);
  }

  delete(
    token: string,
    viewModel: TenantAddressViewModel
  ): Promise<[Response | undefined, TenantAddressViewModel | undefined, string]> {
    return this._post(`${this.baseUrl}/delete`, token, viewModel);
  }
}
