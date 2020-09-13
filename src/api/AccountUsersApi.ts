import {BaseApi, BaseApiType} from "./BaseApi";
import {AccountUserViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class AccountUsersApi extends BaseApi<AccountUserViewModel> implements BaseApiType<AccountUserViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/accountUsers`;

    readItems(token: string): Promise<Array<AccountUserViewModel> | string> {
        const tenantId = window.localStorage.getItem("TenantId");
        if (tenantId) {
            return this._readItems(token, `${this.baseUrl}?tenantId=${tenantId}`);
        } else {
            return this._readItems(token, `${this.baseUrl}`);
        }
    }

    readItem(token: string, itemId: string): Promise<AccountUserViewModel | string> {
        return this._readItem(token, `${this.baseUrl}/${itemId}`);
    }

    addItem(token: string, item: AccountUserViewModel): Promise<string | undefined> {
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string, item: AccountUserViewModel): Promise<string | undefined> {
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string, item: AccountUserViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
