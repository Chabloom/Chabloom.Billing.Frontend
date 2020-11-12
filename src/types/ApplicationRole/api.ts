import { ApplicationConfig, BaseApi, BaseApiType } from "../apiBase";
import { ApplicationRoleViewModel } from "./model";

export class ApplicationRolesApi
  extends BaseApi<ApplicationRoleViewModel>
  implements BaseApiType<ApplicationRoleViewModel> {
  baseUrl: string;

  constructor(config: ApplicationConfig) {
    super(config);
    this.baseUrl = `${config.apiPublicAddress}/api/applicationRoles`;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<ApplicationRoleViewModel> | string> {
    return this._readItems(token, `${this.baseUrl}`);
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<ApplicationRoleViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: ApplicationRoleViewModel
  ): Promise<string | undefined> {
    return this._addItem(token, `${this.baseUrl}`, item);
  }

  editItem(
    token: string | undefined,
    item: ApplicationRoleViewModel
  ): Promise<string | undefined> {
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: ApplicationRoleViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
