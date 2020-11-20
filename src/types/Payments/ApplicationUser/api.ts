import { BaseApi, BaseApiType } from "../../apiBase";
import { ApplicationUserViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { UserService } from "../../UserService";

export class ApplicationUsersApi
  extends BaseApi<ApplicationUserViewModel>
  implements BaseApiType<ApplicationUserViewModel> {
  baseUrl: string;

  constructor(userService: UserService) {
    super(userService);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/applicationUsers`;
  }

  readItems(): Promise<[Array<ApplicationUserViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}`);
  }

  readItem(
    itemId: string
  ): Promise<[ApplicationUserViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: ApplicationUserViewModel
  ): Promise<[ApplicationUserViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: ApplicationUserViewModel
  ): Promise<[ApplicationUserViewModel | undefined, string]> {
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: ApplicationUserViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
