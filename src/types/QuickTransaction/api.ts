import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { QuickTransactionViewModel } from "./model";

export class QuickTransactionApi
  extends BaseApi<QuickTransactionViewModel>
  implements BaseApiType<QuickTransactionViewModel> {
  baseUrl: string;

  constructor() {
    super(undefined);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/quickTransaction`;
  }

  readItems(): Promise<[Array<QuickTransactionViewModel> | undefined, string]> {
    throw new Error("Not implemented");
  }

  readItem(itemId: string): Promise<[QuickTransactionViewModel | undefined, string]> {
    throw new Error("Not implemented");
  }

  addItem(item: QuickTransactionViewModel): Promise<[QuickTransactionViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}`, item, false);
  }

  editItem(item: QuickTransactionViewModel): Promise<[QuickTransactionViewModel | undefined, string]> {
    throw new Error("Not implemented");
  }

  deleteItem(item: QuickTransactionViewModel): Promise<string | undefined> {
    throw new Error("Not implemented");
  }
}
