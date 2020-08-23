import {BaseApi, BaseApiType} from "./BaseApi";
import {BillViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class BillsApi extends BaseApi<BillViewModel> implements BaseApiType<BillViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/bills`;

    readItems(token: string): Promise<[(string | undefined), (Array<BillViewModel> | undefined)]> {
        const tenantId = window.sessionStorage.getItem("TenantId");
        return this._readItems(token, `${this.baseUrl}?tenantId=${tenantId}`);
    }

    readItem(token: string): Promise<[(string | undefined), (BillViewModel | undefined)]> {
        const tenantId = window.sessionStorage.getItem("TenantId");
        return this._readItem(token, `${this.baseUrl}?tenantId=${tenantId}`);
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
