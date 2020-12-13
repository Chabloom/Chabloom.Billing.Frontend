import { BaseViewModel } from "../modelBase";

export interface AccountViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  address: string;
  referenceId: string;
  tenantId: string;
}
