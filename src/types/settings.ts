import { UserManagerSettings } from "oidc-client";

export const ApplicationConfig = {
  name: "chabloom-billing",
  displayName: "Chabloom Billing",
  frontendPublicAddress: "http://localhost:3001",
  backendPublicAddress: "https://billing-api-test.chabloom.com",
  accountsBackendPublicAddress: "https://accounts-api-test.chabloom.com",
};

export const AppInsightsInstrumentationKey = "APPINSIGHTS_INSTRUMENTATIONKEY";

export const OidcSettings: UserManagerSettings = {
  authority: ApplicationConfig.accountsBackendPublicAddress,
  client_id: "Chabloom.Billing.Frontend",
  redirect_uri: `${ApplicationConfig.frontendPublicAddress}/signin-oidc`,
  post_logout_redirect_uri: `${ApplicationConfig.frontendPublicAddress}/signout-oidc`,
  response_type: "code",
  scope: "openid profile Chabloom.Billing",
  filterProtocolClaims: true,
  loadUserInfo: true,
};
