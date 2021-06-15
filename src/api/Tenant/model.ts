import { BaseViewModel } from "../model";

export interface TenantViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
}
