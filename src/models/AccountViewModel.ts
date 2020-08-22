import {ChabloomTableDataType} from "../components/ChabloomTable";

export interface AccountViewModel extends ChabloomTableDataType {
    id?: string;
    name: string;
    externalId: string;
    primaryAddress: string;
    tenant: string;
}
