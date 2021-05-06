import { BaseViewModel } from "../../common";

export interface AccountViewModel extends BaseViewModel {
  readonly id: string;
  name: string;
  address: string;
  referenceId: string;
  tenantId: string;
}
