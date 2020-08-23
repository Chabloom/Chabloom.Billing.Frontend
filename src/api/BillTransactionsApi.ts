import {BaseApi, BaseApiType} from "./BaseApi";
import {BillTransactionViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class BillTransactionsApi extends BaseApi<BillTransactionViewModel> implements BaseApiType<BillTransactionViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/billTransactions`;

    readItems(token: string): Promise<[(string | undefined), (Array<BillTransactionViewModel> | undefined)]> {
        const tenantId = window.sessionStorage.getItem("TenantId");
        return this._readItems(token, `${this.baseUrl}?tenantId=${tenantId}`);
    }

    readItem(token: string): Promise<[(string | undefined), (BillTransactionViewModel | undefined)]> {
        const tenantId = window.sessionStorage.getItem("TenantId");
        return this._readItem(token, `${this.baseUrl}?tenantId=${tenantId}`);
    }

    addItem(token: string, item: BillTransactionViewModel): Promise<string | undefined> {
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string, item: BillTransactionViewModel): Promise<string | undefined> {
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string, item: BillTransactionViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
