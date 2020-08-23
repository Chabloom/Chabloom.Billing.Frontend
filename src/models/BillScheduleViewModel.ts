import {BaseViewModel} from "./BaseViewModel";

export interface BillScheduleViewModel extends BaseViewModel {
    id?: string;
    name: string;
    amount: number;
    dayDue: number;
    interval: number;
    enabled: boolean;
    account: string;
}
