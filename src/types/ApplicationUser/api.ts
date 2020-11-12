import { ApplicationConfig, BaseApi, BaseApiType } from "../apiBase";
import { ApplicationUserViewModel } from "./model";

export class ApplicationUsersApi
  extends BaseApi<ApplicationUserViewModel>
  implements BaseApiType<ApplicationUserViewModel> {
  baseUrl: string;

  constructor(config: ApplicationConfig) {
    super(config);
    this.baseUrl = `${config.apiPublicAddress}/api/applicationUsers`;
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
  ): Promise<string | undefined> {
    return this._addItem(token, `${this.baseUrl}`, item);
  }

  editItem(
    token: string | undefined,
    item: ApplicationUserViewModel
  ): Promise<string | undefined> {
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: ApplicationUserViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
