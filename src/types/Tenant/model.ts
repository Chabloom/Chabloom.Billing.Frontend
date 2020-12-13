import { BaseViewModel } from "../modelBase";

export interface TenantViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
}
