import { BaseViewModel } from "../../../common";

export interface TenantAddressViewModel extends BaseViewModel {
  address: string;
  tenantId: string;
}
