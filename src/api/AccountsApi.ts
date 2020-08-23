import {BaseApi, BaseApiType} from "./BaseApi";
import {AccountViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class AccountsApi extends BaseApi<AccountViewModel> implements BaseApiType<AccountViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/accounts`;

    readItems(token: string): Promise<[(string | undefined), (Array<AccountViewModel> | undefined)]> {
        const tenantId = window.sessionStorage.getItem("TenantId");
        return this._readItems(token, `${this.baseUrl}?tenantId=${tenantId}`);
    }

    readItem(token: string): Promise<[(string | undefined), (AccountViewModel | undefined)]> {
        const tenantId = window.sessionStorage.getItem("TenantId");
        return this._readItem(token, `${this.baseUrl}?tenantId=${tenantId}`);
    }

    addItem(token: string, item: AccountViewModel): Promise<string | undefined> {
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string, item: AccountViewModel): Promise<string | undefined> {
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string, item: AccountViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
