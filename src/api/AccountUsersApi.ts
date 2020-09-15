import {BaseApi, BaseApiType} from "./BaseApi";
import {AccountUserViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class AccountUsersApi extends BaseApi<AccountUserViewModel> implements BaseApiType<AccountUserViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/accountUsers`;
    tenant: string | null;

    constructor(tenant: string | null = null) {
        super();
        this.tenant = tenant;
    }

    readItems(token: string | undefined): Promise<Array<AccountUserViewModel> | string> {
        if (this.tenant) {
            return this._readItems(token, `${this.baseUrl}?tenantId=${this.tenant}`);
        } else {
            return this._readItems(token, `${this.baseUrl}`);
        }
    }

    readItem(token: string | undefined, itemId: string): Promise<AccountUserViewModel | string> {
        return this._readItem(token, `${this.baseUrl}/${itemId}`);
    }

    addItem(token: string | undefined, item: AccountUserViewModel): Promise<string | undefined> {
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string | undefined, item: AccountUserViewModel): Promise<string | undefined> {
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string | undefined, item: AccountUserViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
