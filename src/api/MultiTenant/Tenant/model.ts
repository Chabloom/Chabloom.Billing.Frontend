import { BaseViewModel } from "../../../common";

export interface TenantViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
}
