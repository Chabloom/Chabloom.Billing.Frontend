import {ChabloomTableDataType} from "../components/ChabloomTable";

export interface BillScheduleViewModel extends ChabloomTableDataType {
    id?: string;
    name: string;
    amount: number;
    dayDue: number;
    interval: number;
    enabled: boolean;
    account: string;
}
