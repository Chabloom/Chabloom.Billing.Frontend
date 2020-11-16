import { BaseApi, BaseApiType } from "../../apiBase";
import { ApplicationUserViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { BaseViewModel } from "../../modelBase";

export class ApplicationUsersApi
  extends BaseApi<ApplicationUserViewModel>
  implements BaseApiType<ApplicationUserViewModel> {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `${ApplicationConfig.apiPublicAddress}/api/applicationUsers`;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<ApplicationUserViewModel> | string> {
    return this._readItems(token, `${this.baseUrl}`);
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<ApplicationUserViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: ApplicationUserViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    return this._addItem(token, `${this.baseUrl}`, item);
  }

  editItem(
    token: string | undefined,
    item: ApplicationUserViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: ApplicationUserViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
