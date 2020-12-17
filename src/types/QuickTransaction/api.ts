import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { QuickTransactionViewModel } from "./model";

export class QuickTransactionApi
  extends BaseApi<QuickTransactionViewModel>
  implements BaseApiType<QuickTransactionViewModel> {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/quickTransaction`;
  }

  readItems(token: string): Promise<[Array<QuickTransactionViewModel> | undefined, string]> {
    throw new Error("Not implemented");
  }

  readItem(token: string, itemId: string): Promise<[QuickTransactionViewModel | undefined, string]> {
    throw new Error("Not implemented");
  }

  addItem(token: string, item: QuickTransactionViewModel): Promise<[QuickTransactionViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}`, "", item, false);
  }

  editItem(token: string, item: QuickTransactionViewModel): Promise<[QuickTransactionViewModel | undefined, string]> {
    throw new Error("Not implemented");
  }

  deleteItem(token: string, item: QuickTransactionViewModel): Promise<string | undefined> {
    throw new Error("Not implemented");
  }
}
