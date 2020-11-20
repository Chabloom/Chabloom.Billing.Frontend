import { BaseApi, BaseApiType } from "../../apiBase";
import { ApplicationRoleViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { UserService } from "../../UserService";

export class ApplicationRolesApi
  extends BaseApi<ApplicationRoleViewModel>
  implements BaseApiType<ApplicationRoleViewModel> {
  baseUrl: string;

  constructor(userService: UserService) {
    super(userService);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/applicationRoles`;
  }

  readItems(): Promise<[Array<ApplicationRoleViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}`);
  }

  readItem(
    itemId: string
  ): Promise<[ApplicationRoleViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: ApplicationRoleViewModel
  ): Promise<[ApplicationRoleViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: ApplicationRoleViewModel
  ): Promise<[ApplicationRoleViewModel | undefined, string]> {
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: ApplicationRoleViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
