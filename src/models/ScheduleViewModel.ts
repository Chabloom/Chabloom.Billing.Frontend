import {BaseViewModel} from "./BaseViewModel";

export interface ScheduleViewModel extends BaseViewModel {
    id?: string;
    name: string;
    amount: number;
    dayDue: number;
    interval: number;
    account: string;
}
