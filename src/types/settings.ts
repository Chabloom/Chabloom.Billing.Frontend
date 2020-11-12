import { UserManagerSettings } from "oidc-client";

export const ApplicationConfig = {
  name: "chabloom-payments",
  displayName: "Chabloom Payments",
  apiPublicAddress: "https://payments-api-test.chabloom.com",
  jwtPublicAddress: "https://accounts-api-test.chabloom.com",
};

export const AppInsightsInstrumentationKey = "APPINSIGHTS_INSTRUMENTATIONKEY";

export const OidcSettings: UserManagerSettings = {
  authority: ApplicationConfig.jwtPublicAddress,
  client_id: "Chabloom.Payments.Frontend",
  redirect_uri: "http://localhost:3001/signin-oidc",
  post_logout_redirect_uri: "http://localhost:3001/signout-oidc",
  response_type: "code",
  scope: "openid profile Chabloom.Payments",
  filterProtocolClaims: true,
  loadUserInfo: true,
};
