import {BaseViewModel} from "./BaseViewModel";

export interface BillTransactionViewModel extends BaseViewModel {
    id?: string;
    name: string;
    externalId: string;
    amount: number;
    bill: string;
}
