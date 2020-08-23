import {BaseViewModel} from "./BaseViewModel";

export interface AccountViewModel extends BaseViewModel {
    id?: string;
    name: string;
    externalId: string;
    primaryAddress: string;
    tenant: string;
}
