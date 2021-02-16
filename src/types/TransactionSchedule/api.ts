import { BaseApi, BaseApiType } from "../apiBase";
import { TransactionScheduleViewModel } from "./model";
import { ApplicationConfig } from "../settings";

export class TransactionSchedulesApi
  extends BaseApi<TransactionScheduleViewModel>
  implements BaseApiType<TransactionScheduleViewModel> {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `${ApplicationConfig.backendPublicAddress}/api/transactionSchedules`;
  }

  readItems(token: string): Promise<[Array<TransactionScheduleViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}`, token);
  }

  readItem(token: string, itemId: string): Promise<[TransactionScheduleViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`, token);
  }

  addItem(
    token: string,
    item: TransactionScheduleViewModel
  ): Promise<[TransactionScheduleViewModel | undefined, string]> {
    item.currency = "USD";
    return this._addItem(`${this.baseUrl}`, token, item);
  }

  editItem(
    token: string,
    item: TransactionScheduleViewModel
  ): Promise<[TransactionScheduleViewModel | undefined, string]> {
    item.currency = "USD";
    return this._editItem(`${this.baseUrl}/${item.id}`, token, item);
  }

  deleteItem(token: string, item: TransactionScheduleViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`, token);
  }
}
