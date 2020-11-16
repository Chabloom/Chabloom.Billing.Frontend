import { BaseViewModel } from "../../modelBase";

export interface AccountViewModel extends BaseViewModel {
  id?: string;
  name: string;
  externalId: string;
  primaryAddress: string;
  tenant: string;
}
