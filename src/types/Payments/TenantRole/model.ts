import { BaseViewModel } from "../../modelBase";

export interface TenantRoleViewModel extends BaseViewModel {
  id?: string;
  name: string;
  tenant: string;
}
