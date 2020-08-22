import {ChabloomTableDataType} from "../components/ChabloomTable";

export interface BillViewModel extends ChabloomTableDataType {
    id?: string;
    name: string;
    amount: number;
    dueDate: string;
    account?: string;
}
