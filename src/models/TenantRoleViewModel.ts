import {BaseViewModel} from "./BaseViewModel";

export interface TenantRoleViewModel extends BaseViewModel {
    id?: string;
    name: string;
    tenant: string;
}
