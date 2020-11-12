import { BaseViewModel } from "./BaseViewModel";

export interface TenantViewModel extends BaseViewModel {
  id?: string;
  name: string;
}
