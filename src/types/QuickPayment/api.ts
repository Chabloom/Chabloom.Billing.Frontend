import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { QuickPaymentViewModel } from "./model";

export class QuickPaymentApi extends BaseApi<QuickPaymentViewModel> implements BaseApiType<QuickPaymentViewModel> {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `${ApplicationConfig.backendPublicAddress}/api/quickTransaction`;
  }

  readItems(): Promise<[Array<QuickPaymentViewModel> | undefined, string]> {
    throw new Error("Not implemented");
  }

  readItem(): Promise<[QuickPaymentViewModel | undefined, string]> {
    throw new Error("Not implemented");
  }

  addItem(token: string, item: QuickPaymentViewModel): Promise<[QuickPaymentViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}`, "", item, false);
  }

  editItem(): Promise<[QuickPaymentViewModel | undefined, string]> {
    throw new Error("Not implemented");
  }

  deleteItem(): Promise<string | undefined> {
    throw new Error("Not implemented");
  }
}
