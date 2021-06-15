import { BaseViewModel } from "../../common";

export interface TenantHostViewModel extends BaseViewModel {
  address: string;
  tenantId: string;
}
