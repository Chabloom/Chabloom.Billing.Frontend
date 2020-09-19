import {BaseViewModel} from "./BaseViewModel";

export interface AccountRoleViewModel extends BaseViewModel {
    id?: string;
    name: string;
    account: string;
}
