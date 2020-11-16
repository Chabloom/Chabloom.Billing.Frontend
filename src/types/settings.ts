import { UserManagerSettings } from "oidc-client";

export const ApplicationConfig = {
  name: "chabloom-payments",
  displayName: "Chabloom Payments",
  accountsApiPublicAddress: "https://accounts-api-test.chabloom.com",
  paymentsApiPublicAddress: "https://payments-api-test.chabloom.com",
  processingApiPublicAddress: "https://processing-api-test.chabloom.com",
};

export const AppInsightsInstrumentationKey = "APPINSIGHTS_INSTRUMENTATIONKEY";

export const OidcSettings: UserManagerSettings = {
  authority: ApplicationConfig.accountsApiPublicAddress,
  client_id: "Chabloom.Payments.Frontend",
  redirect_uri: "http://localhost:3000/signin-oidc",
  post_logout_redirect_uri: "http://localhost:3000/signout-oidc",
  response_type: "code",
  scope: "openid profile Chabloom.Payments Chabloom.Processing",
  filterProtocolClaims: true,
  loadUserInfo: true,
};
