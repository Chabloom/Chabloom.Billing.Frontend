import {BaseApi, BaseApiType} from "./BaseApi";
import {ScheduleViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class SchedulesApi extends BaseApi<ScheduleViewModel> implements BaseApiType<ScheduleViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/schedules`;
    account: string | null;

    constructor(account: string | null = null) {
        super();
        this.account = account;
    }

    readItems(token: string): Promise<Array<ScheduleViewModel> | string> {
        const tenantId = window.localStorage.getItem("TenantId");
        if (this.account) {
            return this._readItems(token, `${this.baseUrl}?accountId=${this.account}`);
        } else if (tenantId) {
            return this._readItems(token, `${this.baseUrl}?tenantId=${tenantId}`);
        } else {
            return this._readItems(token, `${this.baseUrl}`);
        }
    }

    readItem(token: string, itemId: string): Promise<ScheduleViewModel | string> {
        return this._readItem(token, `${this.baseUrl}/${itemId}`);
    }

    addItem(token: string, item: ScheduleViewModel): Promise<string | undefined> {
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string, item: ScheduleViewModel): Promise<string | undefined> {
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string, item: ScheduleViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
