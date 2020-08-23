import {BaseApi, BaseApiType} from "./BaseApi";
import {BillScheduleViewModel} from "../models";
import {ApplicationConfig} from "../settings";

export class BillSchedulesApi extends BaseApi<BillScheduleViewModel> implements BaseApiType<BillScheduleViewModel> {
    baseUrl = `${ApplicationConfig.apiPublicAddress}/api/billSchedules`;

    readItems(token: string): Promise<[(string | undefined), (Array<BillScheduleViewModel> | undefined)]> {
        const tenantId = window.sessionStorage.getItem("TenantId");
        return this._readItems(token, `${this.baseUrl}?tenantId=${tenantId}`);
    }

    readItem(token: string): Promise<[(string | undefined), (BillScheduleViewModel | undefined)]> {
        const tenantId = window.sessionStorage.getItem("TenantId");
        return this._readItem(token, `${this.baseUrl}?tenantId=${tenantId}`);
    }

    addItem(token: string, item: BillScheduleViewModel): Promise<string | undefined> {
        return this._addItem(token, `${this.baseUrl}`, item);
    }

    editItem(token: string, item: BillScheduleViewModel): Promise<string | undefined> {
        return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
    }

    deleteItem(token: string, item: BillScheduleViewModel): Promise<string | undefined> {
        return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
    }
}
