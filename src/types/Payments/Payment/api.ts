import { BaseApi, BaseApiType } from "../../apiBase";
import { PaymentViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { UserService } from "../../UserService";

export class PaymentsApi
  extends BaseApi<PaymentViewModel>
  implements BaseApiType<PaymentViewModel> {
  baseUrl: string;
  account: string;

  constructor(userService: UserService, account: string) {
    super(userService);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/payments`;
    this.account = account;
  }

  readItems(): Promise<[Array<PaymentViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?accountId=${this.account}`);
  }

  readTenantAccount(
    accountNumber: string,
    tenantId: string
  ): Promise<[Array<PaymentViewModel> | undefined, string]> {
    return this._readItems(
      `${this.baseUrl}/tenantAccount?accountNumber=${accountNumber}&tenantId=${tenantId}`,
      false
    );
  }

  readItem(itemId: string): Promise<[PaymentViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: PaymentViewModel
  ): Promise<[PaymentViewModel | undefined, string]> {
    item.account = this.account;
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: PaymentViewModel
  ): Promise<[PaymentViewModel | undefined, string]> {
    item.account = this.account;
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: PaymentViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
