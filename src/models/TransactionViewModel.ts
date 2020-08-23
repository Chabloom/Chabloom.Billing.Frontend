import {BaseViewModel} from "./BaseViewModel";

export interface TransactionViewModel extends BaseViewModel {
    id?: string;
    name: string;
    externalId: string;
    amount: number;
    bill: string;
}
