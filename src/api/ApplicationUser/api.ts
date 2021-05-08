import { BaseApi, BaseApiType } from "../../common";
import { ApplicationUserViewModel } from "./model";

export class ApplicationUsersApi
  extends BaseApi<ApplicationUserViewModel>
  implements BaseApiType<ApplicationUserViewModel> {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = `${process.env.REACT_APP_BILLING_BACKEND_ADDRESS}/api/applicationUsers`;
  }

  readItems(token: string): Promise<[Array<ApplicationUserViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}`, token);
  }

  readItem(token: string, itemId: string): Promise<[ApplicationUserViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`, token);
  }

  addItem(token: string, item: ApplicationUserViewModel): Promise<[ApplicationUserViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}`, token, item);
  }

  editItem(token: string, item: ApplicationUserViewModel): Promise<[ApplicationUserViewModel | undefined, string]> {
    return this._editItem(`${this.baseUrl}/${item.id}`, token, item);
  }

  deleteItem(token: string, item: ApplicationUserViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`, token);
  }
}
