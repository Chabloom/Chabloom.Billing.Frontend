import { CreateDeleteAPI } from "../api";
import { UserAccountViewModel } from "./model";

export class UserAccountsAPI extends CreateDeleteAPI<UserAccountViewModel> {
  constructor() {
    super(`${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/userAccounts`);
  }
}
