import {BaseApi, BaseApiType} from "./BaseApi";
import {AccountViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class AccountsApi extends BaseApi<AccountViewModel> implements BaseApiType<AccountViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/accounts`;

    readItems(token: string): Promise<Array<AccountViewModel> | string> {
        const tenantId = window.localStorage.getItem("TenantId");
        if (tenantId) {
            return this._readItems(token, `${this.baseUrl}?tenantId=${tenantId}`);
        } else {
            return this._readItems(token, `${this.baseUrl}`);
        }
    }

    readItem(token: string): Promise<AccountViewModel | string> {
        return this._readItem(token, `${this.baseUrl}`);
    }

    addItem(token: string, item: AccountViewModel): Promise<string | undefined> {
        const tenantId = window.localStorage.getItem("TenantId");
        if (tenantId) {
            item.tenant = tenantId;
        }
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string, item: AccountViewModel): Promise<string | undefined> {
        const tenantId = window.localStorage.getItem("TenantId");
        if (tenantId) {
            item.tenant = tenantId;
        }
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string, item: AccountViewModel): Promise<string | undefined> {
        const tenantId = window.localStorage.getItem("TenantId");
        if (tenantId) {
            item.tenant = tenantId;
        }
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
