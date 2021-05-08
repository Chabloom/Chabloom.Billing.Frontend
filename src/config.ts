import { UserManagerSettings } from "oidc-client";

export const OidcConfiguration: UserManagerSettings = {
  authority: process.env.REACT_APP_ACCOUNTS_BACKEND_ADDRESS,
  client_id: "Chabloom.Billing.Frontend",
  redirect_uri: `${process.env.REACT_APP_BILLING_FRONTEND_ADDRESS}/signin-oidc`,
  post_logout_redirect_uri: `${process.env.REACT_APP_BILLING_FRONTEND_ADDRESS}/signout-oidc`,
  response_type: "code",
  scope: "openid profile Chabloom.Accounts.Backend Chabloom.Billing.Backend Chabloom.Transactions.Backend",
  filterProtocolClaims: true,
  loadUserInfo: true,
};
