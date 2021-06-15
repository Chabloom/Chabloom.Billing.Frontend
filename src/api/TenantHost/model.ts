import { BaseViewModel } from "../model";

export interface TenantHostViewModel extends BaseViewModel {
  hostname: string;
  tenantId: string;
}
