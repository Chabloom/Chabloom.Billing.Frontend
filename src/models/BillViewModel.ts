import {BaseViewModel} from "./BaseViewModel";

export interface BillViewModel extends BaseViewModel {
    id?: string;
    name: string;
    amount: number;
    dueDate: string;
    account: string;
    schedule?: string;
}
