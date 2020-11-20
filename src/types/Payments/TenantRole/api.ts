import { BaseApi, BaseApiType } from "../../apiBase";
import { TenantRoleViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { UserService } from "../../UserService";

export class TenantRolesApi
  extends BaseApi<TenantRoleViewModel>
  implements BaseApiType<TenantRoleViewModel> {
  baseUrl: string;
  tenant: string | null;

  constructor(userService: UserService, tenant: string | null = null) {
    super(userService);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/tenantRoles`;
    this.tenant = tenant;
  }

  readItems(): Promise<[Array<TenantRoleViewModel> | undefined, string]> {
    if (this.tenant) {
      return this._readItems(`${this.baseUrl}?tenantId=${this.tenant}`);
    } else {
      return this._readItems(`${this.baseUrl}`);
    }
  }

  readItem(itemId: string): Promise<[TenantRoleViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: TenantRoleViewModel
  ): Promise<[TenantRoleViewModel | undefined, string]> {
    if (this.tenant) {
      item.tenant = this.tenant;
    }
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: TenantRoleViewModel
  ): Promise<[TenantRoleViewModel | undefined, string]> {
    if (this.tenant) {
      item.tenant = this.tenant;
    }
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: TenantRoleViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
