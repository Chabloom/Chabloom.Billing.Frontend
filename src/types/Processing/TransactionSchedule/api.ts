import { BaseApi, BaseApiType } from "../../apiBase";
import { TransactionScheduleViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { UserService } from "../../UserService";

export class TransactionSchedulesApi
  extends BaseApi<TransactionScheduleViewModel>
  implements BaseApiType<TransactionScheduleViewModel> {
  baseUrl: string;

  constructor(userService: UserService) {
    super(userService);
    this.baseUrl = `${ApplicationConfig.processingApiPublicAddress}/api/transactionSchedules`;
  }

  readItems(): Promise<
    [Array<TransactionScheduleViewModel> | undefined, string]
  > {
    return this._readItems(`${this.baseUrl}`);
  }

  readItem(
    itemId: string
  ): Promise<[TransactionScheduleViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: TransactionScheduleViewModel
  ): Promise<[TransactionScheduleViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}/Demo`, item);
  }

  editItem(
    item: TransactionScheduleViewModel
  ): Promise<[TransactionScheduleViewModel | undefined, string]> {
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: TransactionScheduleViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
