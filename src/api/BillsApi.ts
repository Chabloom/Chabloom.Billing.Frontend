import {BaseApi, BaseApiType} from "./BaseApi";
import {BillViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class BillsApi extends BaseApi<BillViewModel> implements BaseApiType<BillViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/bills`;

    readItems(token: string): Promise<Array<BillViewModel> | string> {
        const tenantId = window.localStorage.getItem("TenantId");
        if (tenantId) {
            return this._readItems(token, `${this.baseUrl}?tenantId=${tenantId}`);
        } else {
            return this._readItems(token, `${this.baseUrl}`);
        }
    }

    readItem(token: string): Promise<BillViewModel | string> {
        return this._readItem(token, `${this.baseUrl}`);
    }

    addItem(token: string, item: BillViewModel): Promise<string | undefined> {
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string, item: BillViewModel): Promise<string | undefined> {
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string, item: BillViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
