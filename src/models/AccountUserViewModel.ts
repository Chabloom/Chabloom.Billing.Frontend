import {BaseViewModel} from "./BaseViewModel";

export interface AccountUserViewModel extends BaseViewModel {
    id?: string;
    userId: string;
    account: string;
    role: string;
}
