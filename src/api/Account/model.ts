import { BaseViewModel } from "../model";

export interface AccountViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  address: string;
  referenceId: string;
  tenantId: string;
}
