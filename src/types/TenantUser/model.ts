import { BaseViewModel } from "../modelBase";

export interface TenantUserViewModel extends BaseViewModel {
  readonly id: string;
  userId: string;
  tenantId: string;
}
