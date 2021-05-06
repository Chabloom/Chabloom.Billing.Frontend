import { BaseViewModel } from "../../common";

export interface TenantUserViewModel extends BaseViewModel {
  readonly id: string;
  userId: string;
  tenantId: string;
}
