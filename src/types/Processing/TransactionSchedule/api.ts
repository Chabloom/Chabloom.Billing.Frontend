import { BaseApi, BaseApiType } from "../../apiBase";
import { TransactionScheduleViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { BaseViewModel } from "../../modelBase";

export class TransactionSchedulesApi
  extends BaseApi<TransactionScheduleViewModel>
  implements BaseApiType<TransactionScheduleViewModel> {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `${ApplicationConfig.processingApiPublicAddress}/api/transactionSchedules`;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<TransactionScheduleViewModel> | string> {
    return this._readItems(token, `${this.baseUrl}`);
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<TransactionScheduleViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: TransactionScheduleViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    return this._addItem(token, `${this.baseUrl}/Demo`, item);
  }

  editItem(
    token: string | undefined,
    item: TransactionScheduleViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: TransactionScheduleViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
