import {BaseApi, BaseApiType} from "./BaseApi";
import {TenantRoleViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class TenantRolesApi extends BaseApi<TenantRoleViewModel> implements BaseApiType<TenantRoleViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/tenantRoles`;
    tenant: string | null;

    constructor(tenant: string | null = null) {
        super();
        this.tenant = tenant;
    }

    readItems(token: string | undefined): Promise<Array<TenantRoleViewModel> | string> {
        if (this.tenant) {
            return this._readItems(token, `${this.baseUrl}?tenantId=${this.tenant}`);
        } else {
            return this._readItems(token, `${this.baseUrl}`);
        }
    }

    readItem(token: string | undefined, itemId: string): Promise<TenantRoleViewModel | string> {
        return this._readItem(token, `${this.baseUrl}/${itemId}`);
    }

    addItem(token: string | undefined, item: TenantRoleViewModel): Promise<string | undefined> {
        if (this.tenant) {
            item.tenant = this.tenant;
        }
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string | undefined, item: TenantRoleViewModel): Promise<string | undefined> {
        if (this.tenant) {
            item.tenant = this.tenant;
        }
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string | undefined, item: TenantRoleViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
