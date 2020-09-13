import {BaseApi, BaseApiType} from "./BaseApi";
import {TenantUserViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class TenantUsersApi extends BaseApi<TenantUserViewModel> implements BaseApiType<TenantUserViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/tenantUsers`;

    readItems(token: string): Promise<Array<TenantUserViewModel> | string> {
        const tenantId = window.localStorage.getItem("TenantId");
        if (tenantId) {
            return this._readItems(token, `${this.baseUrl}?tenantId=${tenantId}`);
        } else {
            return this._readItems(token, `${this.baseUrl}`);
        }
    }

    readItem(token: string, itemId: string): Promise<TenantUserViewModel | string> {
        return this._readItem(token, `${this.baseUrl}/${itemId}`);
    }

    addItem(token: string, item: TenantUserViewModel): Promise<string | undefined> {
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string, item: TenantUserViewModel): Promise<string | undefined> {
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string, item: TenantUserViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
