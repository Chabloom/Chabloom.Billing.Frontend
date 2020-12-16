import { User } from "oidc-client";
import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { BillScheduleViewModel } from "./model";

export class BillSchedulesApi extends BaseApi<BillScheduleViewModel> implements BaseApiType<BillScheduleViewModel> {
  baseUrl: string;
  accountId: string;

  constructor(user: User | undefined, accountId: string) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/billSchedules`;
    this.accountId = accountId;
  }

  readItems(): Promise<[Array<BillScheduleViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?accountId=${this.accountId}`);
  }

  readItem(itemId: string): Promise<[BillScheduleViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(item: BillScheduleViewModel): Promise<[BillScheduleViewModel | undefined, string]> {
    item.accountId = this.accountId;
    item.currency = "USD";
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(item: BillScheduleViewModel): Promise<[BillScheduleViewModel | undefined, string]> {
    item.accountId = this.accountId;
    item.currency = "USD";
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: BillScheduleViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
