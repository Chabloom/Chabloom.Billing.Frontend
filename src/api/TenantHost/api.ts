import { CreateDeleteAPI } from "../api";
import { TenantHostViewModel } from "./model";

export class TenantHostsAPI extends CreateDeleteAPI<TenantHostViewModel> {
  constructor() {
    super(`${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/tenantHosts`);
  }
}
