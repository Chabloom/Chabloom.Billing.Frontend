import { UserManagerSettings } from "oidc-client";
import { Theme } from "@material-ui/core/styles";

export interface Configuration {
  REACT_APP_ACCOUNTS_FRONTEND_ADDRESS: string;
  REACT_APP_BILLING_FRONTEND_ADDRESS: string;
  REACT_APP_ECOMMERCE_FRONTEND_ADDRESS: string;
  REACT_APP_TRANSACTIONS_FRONTEND_ADDRESS: string;
  REACT_APP_ACCOUNTS_BACKEND_ADDRESS: string;
  REACT_APP_BILLING_BACKEND_ADDRESS: string;
  REACT_APP_ECOMMERCE_BACKEND_ADDRESS: string;
  REACT_APP_TRANSACTIONS_BACKEND_ADDRESS: string;
}

declare global {
  interface Window {
    __env__: Configuration;
  }
}

window.__env__ = window.__env__ || {};

declare module "@material-ui/styles" {
  type DefaultTheme = Theme;
}

export const OidcConfiguration: UserManagerSettings = {
  authority: window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS,
  client_id: "Chabloom.Billing.Frontend",
  redirect_uri: `${window.__env__.REACT_APP_BILLING_FRONTEND_ADDRESS}/signin-oidc`,
  post_logout_redirect_uri: `${window.__env__.REACT_APP_BILLING_FRONTEND_ADDRESS}/signout-oidc`,
  response_type: "code",
  scope: "openid profile Chabloom.Billing.Backend",
  filterProtocolClaims: true,
  loadUserInfo: true,
};
