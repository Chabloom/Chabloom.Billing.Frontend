import {BaseApi, BaseApiType} from "./BaseApi";
import {TransactionViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class TransactionsApi extends BaseApi<TransactionViewModel> implements BaseApiType<TransactionViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/transactions`;
    account: string | null;

    constructor(account: string | null = null) {
        super();
        this.account = account;
    }

    readItems(token: string): Promise<Array<TransactionViewModel> | string> {
        const tenantId = window.localStorage.getItem("TenantId");
        if (this.account) {
            return this._readItems(token, `${this.baseUrl}?accountId=${this.account}`);
        } else if (tenantId) {
            return this._readItems(token, `${this.baseUrl}?tenantId=${tenantId}`);
        } else {
            return this._readItems(token, `${this.baseUrl}`);
        }
    }

    readItem(token: string, itemId: string): Promise<TransactionViewModel | string> {
        return this._readItem(token, `${this.baseUrl}/${itemId}`);
    }

    addItem(token: string, item: TransactionViewModel): Promise<string | undefined> {
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string, item: TransactionViewModel): Promise<string | undefined> {
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string, item: TransactionViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
