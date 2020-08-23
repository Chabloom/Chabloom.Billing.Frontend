import {BaseApi, BaseApiType} from "./BaseApi";
import {TenantViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class TenantsApi extends BaseApi<TenantViewModel> implements BaseApiType<TenantViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/tenants`;

    readItems(token: string): Promise<[(string | undefined), (Array<TenantViewModel> | undefined)]> {
        return this._readItems(token, `${this.baseUrl}`);
    }

    readItem(token: string): Promise<[(string | undefined), (TenantViewModel | undefined)]> {
        return this._readItem(token, `${this.baseUrl}`);
    }

    addItem(token: string, item: TenantViewModel): Promise<string | undefined> {
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string, item: TenantViewModel): Promise<string | undefined> {
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string, item: TenantViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
