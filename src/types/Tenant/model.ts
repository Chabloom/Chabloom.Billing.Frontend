import { BaseViewModel } from "../modelBase";

export interface TenantViewModel extends BaseViewModel {
  id?: string;
  name: string;
}
