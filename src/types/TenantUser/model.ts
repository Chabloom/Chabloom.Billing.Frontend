import { BaseViewModel } from "../modelBase";

export interface TenantUserViewModel extends BaseViewModel {
  id?: string;
  userId: string;
  tenant: string;
  tenantName?: string;
  role: string;
  roleName?: string;
}
