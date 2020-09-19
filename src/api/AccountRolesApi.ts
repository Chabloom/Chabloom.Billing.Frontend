import {BaseApi, BaseApiType} from "./BaseApi";
import {AccountRoleViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class AccountRolesApi extends BaseApi<AccountRoleViewModel> implements BaseApiType<AccountRoleViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/accountRoles`;
    account: string | null;
    tenant: string | null;

    constructor(account: string | null = null, tenant: string | null = null) {
        super();
        this.account = account;
        this.tenant = tenant;
    }

    readItems(token: string | undefined): Promise<Array<AccountRoleViewModel> | string> {
        if (this.account) {
            return this._readItems(token, `${this.baseUrl}?accountId=${this.account}`);
        } else if (this.tenant) {
            return this._readItems(token, `${this.baseUrl}?tenantId=${this.tenant}`);
        } else {
            return this._readItems(token, `${this.baseUrl}`);
        }
    }

    readItem(token: string | undefined, itemId: string): Promise<AccountRoleViewModel | string> {
        return this._readItem(token, `${this.baseUrl}/${itemId}`);
    }

    addItem(token: string | undefined, item: AccountRoleViewModel): Promise<string | undefined> {
        if (this.account) {
            item.account = this.account;
        }
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string | undefined, item: AccountRoleViewModel): Promise<string | undefined> {
        if (this.account) {
            item.account = this.account;
        }
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string | undefined, item: AccountRoleViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
