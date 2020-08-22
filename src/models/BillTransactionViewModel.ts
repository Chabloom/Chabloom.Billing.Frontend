import {ChabloomTableDataType} from "../components/ChabloomTable";

export interface BillTransactionViewModel extends ChabloomTableDataType {
    id?: string;
    name: string;
    externalId: string;
    amount: number;
    bill: string;
}
