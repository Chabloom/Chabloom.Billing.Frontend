import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { BillScheduleViewModel } from "./model";

export class BillSchedulesApi extends BaseApi<BillScheduleViewModel> implements BaseApiType<BillScheduleViewModel> {
  baseUrl: string;
  accountId: string;

  constructor(accountId: string) {
    super();
    this.baseUrl = `${ApplicationConfig.billingBackendPublicAddress}/api/billSchedules`;
    this.accountId = accountId;
  }

  readItems(token: string): Promise<[Array<BillScheduleViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?accountId=${this.accountId}`, token);
  }

  readItem(token: string, itemId: string): Promise<[BillScheduleViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`, token);
  }

  addItem(token: string, item: BillScheduleViewModel): Promise<[BillScheduleViewModel | undefined, string]> {
    item.accountId = this.accountId;
    item.currency = "USD";
    return this._addItem(`${this.baseUrl}`, token, item);
  }

  editItem(token: string, item: BillScheduleViewModel): Promise<[BillScheduleViewModel | undefined, string]> {
    item.accountId = this.accountId;
    item.currency = "USD";
    return this._editItem(`${this.baseUrl}/${item.id}`, token, item);
  }

  deleteItem(token: string, item: BillScheduleViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`, token);
  }
}
